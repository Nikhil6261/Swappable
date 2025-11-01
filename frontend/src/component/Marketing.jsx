import React, { useEffect, useState } from "react";
import {
  Calendar,
  ShoppingBag,
  Bell,
  LogOut,
  Clock,
  User,
  ArrowLeftRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Api from "../api/Api";

const MarketplacePage = () => {
  const navigate = useNavigate();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch slots from backend
  const fetchSlots = async () => {
    try {
      const res = await Api.get(`/api/readALL`);
      console.log("Fetched Data:", res.data);

      // 🧠 Filter out user_id = 8
      const filtered = (res.data || []).filter((slot) => slot.user_id !== 8);
      setSlots(filtered);
    } catch (err) {
      console.error("Error fetching slots:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-700 px-6 py-4 border-b">
            ⚡ SlotSwapper
          </h1>
          <nav className="mt-4 space-y-1">
            <button
              onClick={() => navigate("/dash")}
              className="flex items-center w-full px-6 py-3 text-gray-700 hover:bg-gray-100"
            >
              <Calendar className="w-5 h-5 mr-2" /> Dashboard
            </button>
            <button className="flex items-center w-full px-6 py-3 text-white bg-blue-600 font-medium rounded-r-full">
              <ShoppingBag className="w-5 h-5 mr-2" /> Marketplace
            </button>
            <button className="flex items-center w-full px-6 py-3 text-gray-700 hover:bg-gray-100">
              <Bell className="w-5 h-5 mr-2" /> Requests
            </button>
          </nav>
        </div>
        <div className="p-6 border-t">
          <p className="font-medium text-gray-800">Alice Smith</p>
          <p className="text-sm text-gray-500 mb-3">alice@example.com</p>
          <button className="flex items-center justify-center w-full gap-2 border border-red-400 text-red-600 py-2 rounded-md hover:bg-red-50">
            <LogOut className="w-4 h-4" /> Log Out
          </button>
        </div>
      </aside>

      {/* Marketplace Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6">Marketplace</h2>

        {loading ? (
          <p className="text-gray-500">Loading available slots...</p>
        ) : slots.length === 0 ? (
          <p className="text-gray-500">No available slots right now.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {slots.map((s) => (
              <div
                key={s.id}
                className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg mb-1">{s.title}</h3>
                <p className="text-sm text-gray-600 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />{" "}
                  {new Date(s.start_time).toLocaleString("en-IN", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}{" "}
                  –{" "}
                  {new Date(s.end_time).toLocaleString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
                <p className="text-sm text-gray-600 flex items-center mb-4">
                  <User className="w-4 h-4 mr-2" /> User #{s.user_id}
                </p>
                <button className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                  <ArrowLeftRight className="w-4 h-4" /> Request Swap
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MarketplacePage;
