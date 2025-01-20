import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux"; // Import useSelector
import axios from "axios";

const PaymentForm = ({ clientSecret, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState("");

  // Access userId from Redux store
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id; // Retrieve userId from the user object

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      console.error("Payment failed:", error.message);
      setPaymentStatus("Payment failed! Try again.");
    } else if (paymentIntent.status === "succeeded") {
      console.log("Payment succeeded!");
      setPaymentStatus(`Payment succeeded! Payment ID: ${paymentIntent.id} | User ID: ${userId}`);

      // Send payment details to the backend
      try {
        await axios.post("http://localhost:8000/api/v1/payment/savePayment", {
          paymentIntentId: paymentIntent.id,
          amount: amount,
          currency: "inr",
          status: paymentIntent.status,
          userId: userId, // Include userId from Redux store
        });
        console.log("Payment details saved successfully.");
      } catch (saveError) {
        console.error("Error saving payment details:", saveError.message);
      }
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "'Inter', sans-serif",
        fontSize: "16px",
        "::placeholder": {
          color: "#a0aec0",
        },
      },
      invalid: {
        color: "#fa755a",
      },
    },
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Payment Form</h2>
        <div className="mb-4">
          <label htmlFor="card-element" className="block text-sm font-medium text-gray-700 mb-2">
            Card Details
          </label>
          <div className="border border-gray-300 rounded-lg p-3 bg-gray-50">
            <CardElement id="card-element" options={cardElementOptions} className="w-full" />
          </div>
        </div>
        <button
          type="submit"
          disabled={!stripe}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          Pay ₹{amount}
        </button>
        {paymentStatus && (
          <p className="text-center text-sm mt-4 text-gray-700">{paymentStatus}</p>
        )}
      </form>
    </div>
  );
};

export default PaymentForm;
