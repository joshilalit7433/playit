import React from "react";
import { useLocation } from "react-router-dom";

const BookingForm = () => {
  const location = useLocation();
  const { turf, startSlot, endSlot } = location.state;

  const calculateTotalCost = () => {
    const start = new Date(
      `1970-01-01T${convertTo24HourFormat(startSlot.time)}`
    );
    const end = new Date(`1970-01-01T${convertTo24HourFormat(endSlot.time)}`);
    const durationInHours = (end - start) / (1000 * 60 * 60);

    // Ensure duration is greater than 0
    if (durationInHours <= 0) {
      return 0;
    }

    return Math.ceil(durationInHours) * turf.price;
  };

  // Converts 12-hour time to 24-hour format for Date object compatibility
  const convertTo24HourFormat = (time) => {
    const [hours, minutes, period] = time
      .match(/(\d+):(\d+)\s*(AM|PM)/)
      .slice(1);
    let hour24 = parseInt(hours, 10);
    if (period === "PM" && hour24 !== 12) {
      hour24 += 12;
    } else if (period === "AM" && hour24 === 12) {
      hour24 = 0;
    }
    return `${hour24.toString().padStart(2, "0")}:${minutes}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingDetails = {
      turfName: turf.name,
      startDate: startSlot.date,
      startTime: startSlot.time,
      endDate: endSlot.date,
      endTime: endSlot.time,
      totalPrice: calculateTotalCost(),
    };

    console.log("Booking submitted:", bookingDetails);
    alert("Booking Successful!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Booking Details</h1>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Turf Name
          </label>
          <p className="text-lg">{turf.name}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Start Time
          </label>
          <p className="text-lg">{`${startSlot.date} - ${startSlot.time}`}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            End Time
          </label>
          <p className="text-lg">{`${endSlot.date} - ${endSlot.time}`}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Total Amount
          </label>
          <p className="text-lg">₹{calculateTotalCost()}</p>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default BookingForm;
