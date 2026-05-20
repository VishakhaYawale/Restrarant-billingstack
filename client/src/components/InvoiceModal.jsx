export default function InvoiceModal({ cart, total, close }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-xl font-bold mb-4">Invoice</h2>

        {cart.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span>{item.name}</span>
            <span>₹{item.price}</span>
          </div>
        ))}

        <hr className="my-2" />
        <h3>Total: ₹{total}</h3>

        <button
          onClick={close}
          className="mt-4 w-full bg-emerald-500 text-white p-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}