import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const PaymentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clientSecret, amount, bookingDetails } = location.state; // Include bookingDetails in state

  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );

    if (error) {
      console.error("Payment failed:", error.message);
      setPaymentStatus("Payment failed! Try again.");
    } else if (paymentIntent.status === "succeeded") {
      setPaymentStatus(`Payment succeeded! Payment ID: ${paymentIntent.id}`);

      // Trigger create booking API
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/booking/create-booking",
          {
            turfId: bookingDetails.turfId,
            userId: bookingDetails.userId,
            paymentId: paymentIntent.id,
            bookingDate: bookingDetails.bookingDate,
            startTime: bookingDetails.startTime,
            endTime: bookingDetails.endTime,
            status: "confirmed",
            amountPaid: amount,
            paymentStatus: "paid",
          },
          { withCredentials: true }
        );

        if (response.status === 201) {
          console.log(response.data);
          console.log("Booking created");

          navigate("/", {
            state: { booking: response.data.booking },
          });
        } else {
          setPaymentStatus("Booking creation failed.");
        }
      } catch (bookingError) {
        console.error("Error creating booking:", bookingError.message);
        setPaymentStatus("An error occurred while creating the booking.");
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
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Complete Your Payment
        </h2>
        <div className="mb-4">
          <label
            htmlFor="card-element"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Card Details
          </label>
          <div className="border border-gray-300 rounded-lg p-3 bg-gray-50">
            <CardElement id="card-element" options={cardElementOptions} />
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
          <p className="text-center text-sm mt-4 text-gray-700">
            {paymentStatus}
          </p>
        )}
      </form>
    </div>
  );
};

export default PaymentForm;
