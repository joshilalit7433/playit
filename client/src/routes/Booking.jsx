import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const BookingForm = () => {
  const location = useLocation();
  const turf = location.state?.turf;

  const [formData, setFormData] = useState({
    bookingDate: "",
    startTime: "",
    endTime: "",
    amountPaid: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking data submitted: ", {
      ...formData,
      turfName: turf.name,
    });
    // Add logic to integrate with backend API
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Book Your Turf</h1>

        {/* Display Turf Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Turf Name
          </label>
          <p className="text-lg">{turf.name}</p>
        </div>

        {/* Time Selection */}
        <div className="mb-4">
          <label
            htmlFor="startTime"
            className="block text-gray-700 font-medium mb-2"
          >
            Start Time
          </label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="endTime"
            className="block text-gray-700 font-medium mb-2"
          >
            End Time
          </label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Calendar */}
        <div className="mb-4">
          <label
            htmlFor="bookingDate"
            className="block text-gray-700 font-medium mb-2"
          >
            Select Date
          </label>
          <input
            type="date"
            id="bookingDate"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Amount Paid */}
        <div className="mb-4">
          <label
            htmlFor="amountPaid"
            className="block text-gray-700 font-medium mb-2"
          >
            Amount Paid
          </label>
          <input
            type="number"
            id="amountPaid"
            name="amountPaid"
            value={formData.amountPaid}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Amount"
            required
          />
        </div>

        {/* Pay Now Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
