import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clientSecret, amount, bookingDetails, user } = location.state; // Include bookingDetails and user in state

  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPaymentStatus("Processing payment...");

    if (!stripe || !elements) {
      setPaymentStatus("Stripe not initialized");
      return;
    }

    try {
      // First check the PaymentIntent status
      const { paymentIntent: existingIntent } =
        await stripe.retrievePaymentIntent(clientSecret);

      if (existingIntent.status === "succeeded") {
        setPaymentStatus("This payment has already been processed.");
        return;
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: user?.name || "Guest User",
            },
          },
        }
      );

      if (error) {
        console.error("Payment failed:", error);
        setPaymentStatus(`Payment failed: ${error.message}`);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        setPaymentStatus(`Payment succeeded! Processing booking...`);

        // Handle subscription booking
        if (bookingDetails.isSubscription) {
          try {
            const subscriptionResponse = await axios.post(
              "http://localhost:8000/api/v1/subscription/create",
              {
                userId: bookingDetails.userId,
                turfId: bookingDetails.turfId,
                startDate: bookingDetails.startDate,
                endDate: bookingDetails.endDate,
                price: bookingDetails.price,
                selectedSlots: bookingDetails.selectedSlots,
                paymentDetails: {
                  method: "credit_card",
                  transactionId: paymentIntent.id,
                  status: "completed",
                },
              },
              { withCredentials: true }
            );

            if (subscriptionResponse.status === 201) {
              toast.success("Subscription booked successfully!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              navigate("/");
            }
          } catch (error) {
            toast.error(
              "Failed to create subscription. Please contact support.",
              {
                position: "top-center",
                autoClose: 3000,
                theme: "dark",
              }
            );
            console.error("Subscription creation failed:", error);
          }
        } else {
          // Handle regular booking
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
              toast.success("Booking completed successfully!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              navigate("/");
            }
          } catch (error) {
            toast.error("Failed to create booking. Please contact support.", {
              position: "top-center",
              autoClose: 3000,
              theme: "dark",
            });
            console.error("Booking creation failed:", error);
          }
        }
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      setPaymentStatus("An unexpected error occurred. Please try again.");
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
