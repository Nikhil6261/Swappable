import React ,{lazy}from "react";

import { Calendar, ArrowLeftRight, Clock, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";


const Hero = () => {
  const swappableSlots = [
    { id: 1, title: "Team Meeting", time: "10:00 AM - 11:00 AM", date: "Tue, Oct 31", owner: "Amit" },
    { id: 2, title: "Client Call", time: "2:00 PM - 3:00 PM", date: "Wed, Nov 1", owner: "Priya" },
    { id: 3, title: "Code Review", time: "4:00 PM - 5:00 PM", date: "Thu, Nov 2", owner: "Rohit" },
  ];
  
  const   navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-2">
          <ArrowLeftRight className="w-7 h-7" />
          SlotSwapper
        </h1>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button  onClick={() => navigate("/login")}
           className="text-indigo-700 font-medium hover:text-indigo-900 transition">
            Login
          </button>
          <button onClick={ ()=>{ navigate('/signup')}}
           className="bg-indigo-600 text-white px-4 py-2 rounded-xl shadow hover:bg-indigo-700 transition">
            Signup
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700 transition">
            Mark Slot as Swappable
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Swap Time, Simplify Life ⏱️
        </h2>
        <p className="text-gray-600 max-w-lg mx-auto">
          Share your busy slots with others and swap them easily to make your schedule flexible.
        </p>
      </section>

      {/* Swappable Slots Section */}
      <section>
        <h3 className="text-xl font-semibold text-indigo-700 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" /> Available Swappable Slots
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {swappableSlots.map((slot) => (
            <div
              key={slot.id}
              className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition border border-indigo-100"
            >
              <h4 className="text-lg font-bold text-gray-800">{slot.title}</h4>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <Clock className="w-4 h-4" />
                {slot.time}
              </div>
              <p className="text-sm text-gray-500 mt-1">{slot.date}</p>
              <div className="flex items-center gap-2 mt-3 text-indigo-600 font-medium">
                <UserPlus className="w-4 h-4" />
                {slot.owner}
              </div>
              <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition">
                Request Swap
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Hero;
