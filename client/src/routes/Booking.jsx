import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state


const BookingForm = () => {
  const location = useLocation();
  const { turf, startSlot, endSlot } = location.state;

  const user = useSelector((state) => state.auth.user); // Get user data from Redux
    const userId = user?._id; // Extract userId from user object in Redux
  

  const [error, setError] = useState("");
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

  const handlePayNow = async () => {
    const totalAmount = calculateTotalCost();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/payment/post-payment",
        {
          amount: totalAmount,
          currency: "inr",
          userId:userId , // Replace with actual userId if available
        }
      );

      if (response.data.clientSecret) {
        // Navigate to PaymentForm with clientSecret and amount
        navigate("/checkout", {
          state: {
            clientSecret: response.data.clientSecret,
            amount: totalAmount,
          },
        });
      } else {
        setError("Failed to fetch client secret.");
      }
    } catch (error) {
      console.error("Error creating payment intent:", error.message);
      setError("An error occurred while creating the payment intent.");
    }
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

        {error && (
          <div className="mb-4 text-red-500">
            <p>{error}</p>
          </div>
        )}

        <button
          onClick={handlePayNow}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default BookingForm;
