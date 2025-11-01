import React from "react";
import { ArrowLeftRight, Calendar, Clock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  // Example data to show how swapping works
  const exampleSlots = [
    {
      id: 1,
      title: "Team Meeting",
      time: "10:00 AM - 11:00 AM",
      date: "Mon, Nov 3",
      user: "Amit (Busy → Swappable)",
    },
    {
      id: 2,
      title: "Client Call",
      time: "2:00 PM - 3:00 PM",
      date: "Tue, Nov 4",
      user: "Priya (Swappable → Busy)",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-2">
          <ArrowLeftRight className="w-7 h-7" />
          SlotSwapper
        </h1>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="text-indigo-700 font-medium hover:text-indigo-900 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl shadow hover:bg-indigo-700 transition"
          >
            Signup
          </button>
        </div>
      </header>

      {/* Hero Content */}
      <section className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-3">
          Swap Time, Simplify Life ⏱️
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto text-lg">
          <b>SlotSwapper</b> lets you mark your busy time slots as swappable, so others
          can request to swap them with their own. It’s an easy way to make your
          schedule flexible and efficient.
        </p>
      </section>

      {/* Example Section */}
      <section>
        <h3 className="text-xl font-semibold text-indigo-700 mb-4 flex items-center gap-2 justify-center">
          <Calendar className="w-5 h-5" /> Example of How It Works
        </h3>

        <div className="flex flex-wrap justify-center gap-6">
          {exampleSlots.map((slot) => (
            <div
              key={slot.id}
              className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition border border-indigo-100 w-72"
            >
              <h4 className="text-lg font-bold text-gray-800">{slot.title}</h4>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <Clock className="w-4 h-4" />
                {slot.time}
              </div>
              <p className="text-sm text-gray-500 mt-1">{slot.date}</p>
              <div className="flex items-center gap-2 mt-3 text-indigo-600 font-medium">
                <User className="w-4 h-4" />
                {slot.user}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Hero;
