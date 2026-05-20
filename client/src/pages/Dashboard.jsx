import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8003/api/orders", {
        headers: { Authorization: token }
      })
      .then(res => setOrders(res.data));
  }, []);

  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">
        Orders History
      </h1>

      <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b">
            <tr>
              <th>Total</th>
              <th>Created By</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-b">
                <td>₹{order.totalAmount}</td>
                <td>{order.createdBy?.name}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}