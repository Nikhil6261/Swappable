import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import APi from '../api/Api'


const CreateSwapForm = ({ onClose, onSubmit }) => {
  const {
    register, handleSubmit, reset, formState: { errors }, } = useForm({
        defaultValues: {title: "", date: "", start_time: "", end_time: "", status: "busy",
    },
  });

  const submitForm = async (data) => {
    const formattedData = {
      title: data.title,
      start_time: `${data.date} ${data.start_time}`,
      end_time: `${data.date} ${data.end_time}`,
      status: data.status,
    };
    
    
    console.log(data);
    const res = await APi.post('/api/create',data)
    
    
    console.log(res);
    reset();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="bg-white w-full max-w-md sm:max-w-lg rounded-2xl shadow-2xl p-6 border border-gray-200"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-5 border-b pb-3">
          <h2 className="text-xl font-semibold text-gray-800">🌀 Create New Swap</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Swap Title
            </label>
            <input
              type="text"
              placeholder="e.g., Team Meeting or Client Call"
              {...register("title", { required: "Title is required" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Date
            </label>
            <input
              type="date"
              {...register("date", { required: "Date is required" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>

          {/* Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Start Time
              </label>
              <input
                type="time"
                {...register("start_time", { required: "Start time is required" })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.start_time && (
                <p className="text-red-500 text-sm mt-1">{errors.start_time.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                End Time
              </label>
              <input
                type="time"
                {...register("end_time", { required: "End time is required" })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.end_time && (
                <p className="text-red-500 text-sm mt-1">{errors.end_time.message}</p>
              )}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Status
            </label>
            <select
              {...register("status")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="busy">Busy</option>
              <option value="swappable">Swappable</option>
              <option value="available">Available</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all"
          >
            Create Swap
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateSwapForm;
