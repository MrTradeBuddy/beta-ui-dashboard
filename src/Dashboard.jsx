import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [signal, setSignal] = useState(null);

  const fetchSignal = async () => {
    try {
      const res = await fetch("https://mrtradebot.onrender.com/last-signal");
      const data = await res.json();
      setSignal(data);
    } catch (err) {
      console.error("Failed to fetch signal", err);
    }
  };

  useEffect(() => {
    fetchSignal();
    const interval = setInterval(fetchSignal, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">📊 Mr. Trade Buddy – Live Signal Dashboard</h1>

      {signal && signal.payload ? (
        <div className="bg-gray-800 rounded-xl p-6 shadow-xl w-full max-w-xl">
          <p className="text-xl mb-4">Live Trade Signal</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400">Symbol:</p>
              <p className="text-xl font-bold">{signal.payload.symbol}</p>
            </div>
            <div>
              <p className="text-gray-400">Price:</p>
              <p className="text-xl font-bold">{signal.payload.price}</p>
            </div>
            <div>
              <p className="text-gray-400">Type:</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${signal.payload.type === "buy" ? "bg-green-500" : "bg-red-500"}`}>
                {signal.payload.type.toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-gray-400">Lot Size:</p>
              <p className="text-xl font-bold">{signal.payload.amount}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-400">No live signal yet...</p>
      )}
    </div>
  );
}
