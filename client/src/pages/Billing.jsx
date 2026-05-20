
import { useEffect, useState } from "react";
import axios from "axios";

export default function Billing() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:8003/api/menu")
      .then(res => setMenu(res.data));
  }, []);

  const addToCart = (item) => {
    setCart([...cart, { ...item, quantity: 1 }]);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const generateBill = async () => {
    await axios.post(
      "http://localhost:8003/api/orders",
      { items: cart, totalAmount: total },
      { headers: { Authorization: token } }
    );

    alert("Bill Generated!");
    setCart([]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-slate-100 min-h-screen">
      
      {/* MENU SECTION */}
      <div className="md:col-span-2 bg-white rounded-2xl shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Menu</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {menu.map(item => (
            <button
              key={item._id}
              onClick={() => addToCart(item)}
              className="bg-slate-800 text-white p-3 rounded-xl hover:bg-slate-700"
            >
              {item.name} <br /> ₹{item.price}
            </button>
          ))}
        </div>
      </div>

      {/* BILL SECTION */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Invoice</h2>

        {cart.map((item, index) => (
          <div key={index} className="flex justify-between mb-2">
            <span>{item.name}</span>
            <span>₹{item.price}</span>
          </div>
        ))}

        <hr className="my-3" />

        <h3 className="font-bold text-lg">Total: ₹{total}</h3>

        <button
          onClick={generateBill}
          className="w-full mt-4 bg-emerald-500 text-white p-2 rounded-xl hover:bg-emerald-600"
        >
          Generate Bill
        </button>
      </div>
    </div>
  );
}