import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export const TransactionHistory = () => {
  const location = useLocation();
  const firstname = location.state?.firstname ?? "";
  const userId    = location.state?.userId    ?? "";
  const username  = location.state?.username  ?? "";
  const balance =location.state?.balance;
  const navigate=useNavigate();

  const [showTx, setShowTx] = useState(false);

  const initial =
    firstname.trim()[0]?.toUpperCase();

  return (
    <div
      className={
        `flex min-h-screen bg-gray-100 transition-all duration-300` +
        (showTx ? " justify-start" : " justify-center") } >
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md m-4">
        <div className="w-20 h-20 bg-slate-900 text-white text-4xl font-bold rounded-full flex items-center justify-center mx-auto mb-6">
          {initial}
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Profile Information
        </h2>
      
        <div className="space-y-4">
          {[
            ["Name", firstname],
            ["Username",   username],
            ["balance", balance],
            ["User ID",    userId],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between items-center border-b pb-2"
            >
              <span className="font-semibold text-gray-600">{label}:</span>
              <span className="text-gray-800">{value || "—"}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => setShowTx(!showTx)}
          className="w-full py-2 mt-6 bg-black hover:bg-slate-800 text-white rounded-md transition-colors"
        >
          {showTx ? "Hide Transactions" : "View Transactions"}
        </button>
          <button
          onClick={()=>{navigate(-1);}}
          className="w-full py-2 mt-6 bg-black hover:bg-slate-800 text-white rounded-md transition-colors"
        >Back
        </button>
      </div>

      
      {showTx && (
        <div className="flex-1 m-4 bg-white shadow-inner rounded-2xl p-8 overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>

          <ul className="space-y-3">
            {[
              { id: 1, desc: "Paid ₹ 250 to John",   date: "2025‑07‑02" },
              { id: 2, desc: "Received ₹ 1 000",      date: "2025‑06‑28" },
              { id: 3, desc: "Paid ₹ 80 to CoffeeCo", date: "2025‑06‑27" },
            ].map(tx => (
              <li
                key={tx.id}
                className="border rounded-md p-3 flex justify-between items-center"
              >
                <span>{tx.desc}</span>
                <span className="text-gray-500 text-sm">{tx.date}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
