import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BuySubscription = () => {
  const [duration, setDuration] = useState("1 month");
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Duration:</h2>
        <div className="flex space-x-2 mb-6">
          {["1 month", "3 month", "6 month"].map((item) => (
            <button
              key={item}
              onClick={() => setDuration(item)}
              className={`px-4 py-2 border rounded-md ${
                duration === item
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <h2 className="text-lg font-semibold mb-4">Calendar</h2>
        <div className="border p-4 rounded-lg mb-6">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            inline
          />
        </div>
        <button className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800">
          Proceed To Booking
        </button>
      </div>

      {/* Booking Table */}
      {bookings.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Date</th>
                <th className="border p-2">Start Time</th>
                <th className="border p-2">End Time</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{booking.date}</td>
                  <td className="border p-2">
                    <input
                      type="time"
                      value={booking.startTime}
                      onChange={(e) =>
                        handleTimeChange(index, "startTime", e.target.value)
                      }
                      className="border p-1 rounded"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="time"
                      value={booking.endTime}
                      onChange={(e) =>
                        handleTimeChange(index, "endTime", e.target.value)
                      }
                      className="border p-1 rounded"
                    />
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Proceed Button */}
      <button className="mt-6 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800">
        Proceed To Booking
      </button>
    </div>
  );
};

export default BuySubscription;
