import React, { useEffect, useState } from "react";
import api from "../api/Api";
import { Calendar, ShoppingBag, Bell, LogOut, Clock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  // 🔹 Fetch all events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("api/readALL");
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  // 🔹 Convert backend timestamps to readable format
  const formatTime = (start, end) => {
    const s = new Date(start).toLocaleString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const e = new Date(end).toLocaleString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${s} - ${e}`;
  };

  // 🔹 Map event colors based on status
  const getColors = (status) => {
    switch (status) {
      case "ready_to_swap":
        return { border: "border-green-400", button: "bg-green-600 hover:bg-green-700", text: "text-green-700" };
      case "swappable":
        return { border: "border-blue-400", button: "bg-blue-600 hover:bg-blue-700", text: "text-blue-700" };
      default:
        return { border: "border-gray-300", button: "bg-gray-400 hover:bg-gray-500", text: "text-gray-700" };
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col justify-between">
        <div>
          <div className="px-6 py-4 border-b">
            <h1 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
              ⚡ SlotSwapper
            </h1>
          </div>
          <nav className="mt-4 space-y-1">
            <button className="flex items-center w-full px-6 py-3 text-left text-white bg-blue-600 font-medium rounded-r-full">
              <Calendar className="w-5 h-5 mr-2" />
              Dashboard
            </button>
            <button
              onClick={() => navigate("/marketplace")}
              className="flex items-center w-full px-6 py-3 text-gray-700 hover:bg-gray-100"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Marketplace
            </button>
            <button className="flex items-center w-full px-6 py-3 text-gray-700 hover:bg-gray-100">
              <Bell className="w-5 h-5 mr-2" />
              Requests
            </button>
          </nav>
        </div>

        {/* User Info */}
        <div className="p-6 border-t">
          <div className="mb-3">
            <p className="font-medium text-gray-800">Alice Smith</p>
            <p className="text-sm text-gray-500">alice@example.com</p>
          </div>
          <button className="flex items-center justify-center w-full gap-2 px-4 py-2 border border-red-400 text-red-600 rounded-md hover:bg-red-50">
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">My Calendar</h2>
          <button
            onClick={() => navigate("/create")}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <Calendar className="w-5 h-5" />
            Add New Event
          </button>
        </div>

        {/* Event Cards */}
        <div className="flex gap-6 flex-wrap">
          {events.length === 0 ? (
            <p className="text-gray-500">No events found.</p>
          ) : (
            events.map((event) => {
              const color = getColors(event.status);
              return (
                <div
                  key={event.id}
                  className={`border ${color.border} rounded-xl shadow-sm bg-white p-5 w-80`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg text-gray-800">{event.title}</h3>
                    <span className={`text-sm px-2 py-0.5 rounded-full bg-gray-100 ${color.text}`}>
                      {event.status}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-1">
                    <Clock className="w-4 h-4 mr-2" />
                    {formatTime(event.start_time, event.end_time)}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <User className="w-4 h-4 mr-2" />
                    User ID: {event.user_id}
                  </div>
                  <button className={`w-full text-white font-medium py-2 rounded-md transition ${color.button}`}>
                    {event.status === "swappable"
                      ? "Mark as Ready"
                      : event.status === "ready_to_swap"
                      ? "Swap Now"
                      : "Busy"}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
