import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PaymentForm from "../components/CheckOut";

const PaymentPage = () => {
  const [clientSecret, setClientSecret] = useState(""); // To store the client secret
  const [error, setError] = useState(""); // To store any error message
  const location = useLocation();
  const { amount, userId } = location.state || {}; // Destructure from state

  const createPaymentIntent = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/payment/postPayment", {
        amount: amount , // Convert amount to cents
        currency:"inr",
        userId,
      });

      if (response.data.clientSecret) {
        setClientSecret(response.data.clientSecret);
        setError(""); // Clear any previous error
      } else {
        setError("Failed to fetch client secret.");
      }
    } catch (error) {
      console.error("Error creating payment intent:", error.message);
      setError("An error occurred while creating the payment intent.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Payment Page</h1>

      <p className="mb-4 text-lg text-gray-700">
        Total Amount: ₹{amount}
      </p>

      <button
        onClick={createPaymentIntent}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Create Payment Intent
      </button>

      {clientSecret && (
        <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded">
          <h2 className="text-lg font-semibold mb-2">Client Secret</h2>
          <p className="text-sm text-gray-800">{clientSecret}</p>
        </div>
      )}

      {error && (
        <div className="mt-4 text-red-500">
          <p>{error}</p>
        </div>
      )}

      {clientSecret && <PaymentForm clientSecret={clientSecret} />}
    </div>
  );
};

export default PaymentPage;
