import React from "react";
import { Calendar, ShoppingBag, Bell, LogOut, Clock, User, ArrowLeftRight } from "lucide-react";
import {useNavigate} from 'react-router-dom'

const MarketplacePage = () => {
  const slots = [
    { id: 1, title: "Team Standup", owner: "John Doe", time: "Wed, Nov 6 | 10–10:30 AM" },
    { id: 2, title: "Client Review", owner: "Sarah Miller", time: "Thu, Nov 7 | 4–5 PM" },
    { id: 3, title: "Code Review", owner: "Mark Wilson", time: "Fri, Nov 8 | 2–3 PM" },
  ];

  const navigate =useNavigate() 

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-700 px-6 py-4 border-b">⚡ SlotSwapper</h1>
          <nav className="mt-4 space-y-1">
            <button onClick={()=>  navigate('/dash' )} 
            className="flex items-center w-full px-6 py-3 text-gray-700 hover:bg-gray-100">
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {slots.map(s => (
            <div key={s.id} className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md">
              <h3 className="font-semibold text-lg mb-1">{s.title}</h3>
              <p className="text-sm text-gray-600 flex items-center">
                <Clock className="w-4 h-4 mr-2" /> {s.time}
              </p>
              <p className="text-sm text-gray-600 flex items-center mb-4">
                <User className="w-4 h-4 mr-2" /> {s.owner}
              </p>
              <button className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                <ArrowLeftRight className="w-4 h-4" /> Request Swap
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MarketplacePage;
