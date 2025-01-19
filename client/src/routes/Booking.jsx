import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookingForm = () => {
  const location = useLocation();
  const { turf, startSlot, endSlot } = location.state;
  const navigate = useNavigate();

  const calculateTotalCost = () => {
    const startTimeParts = startSlot.time.split(" ");
    const endTimeParts = endSlot.time.split(" ");
    const [startHours, startMinutes] = startTimeParts[0].split(":").map(Number);
    const [endHours, endMinutes] = endTimeParts[0].split(":").map(Number);

    const startPeriod = startTimeParts[1]; // AM or PM
    const endPeriod = endTimeParts[1];

    let startHours24 =
      startPeriod === "PM" && startHours !== 12 ? startHours + 12 : startHours;
    let endHours24 =
      endPeriod === "PM" && endHours !== 12 ? endHours + 12 : endHours;

    if (startPeriod === "AM" && startHours === 12) startHours24 = 0; // Midnight adjustment
    if (endPeriod === "AM" && endHours === 12) endHours24 = 0;

    const start = new Date(1970, 0, 1, startHours24, startMinutes);
    const end = new Date(1970, 0, 1, endHours24, endMinutes);

    const durationInHours = (end - start) / (1000 * 60 * 60); // Convert milliseconds to hours
    const totalCost = durationInHours * turf.price; // Multiply by hourly price

    return totalCost.toFixed(2); // Keep two decimal places for clarity
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalAmount = calculateTotalCost();

    // Navigate to PaymentPage with total amount
    navigate("/paymentpage", {
      state: { amount: totalAmount, currency: "usd", userId: "12345" },
    });
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
