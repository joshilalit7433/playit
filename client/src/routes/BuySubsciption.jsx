import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    </div>
  );
};

export default BuySubscription;
