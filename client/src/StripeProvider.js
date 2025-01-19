import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe with your Publishable Key
const stripePromise = loadStripe("pk_test_51QgjNe09HGOXkg8viWL8pjd40ZUvHm9gr8EzgaMDDUy1Zy8F6GK4OYncFiMWIvs77rTRUKuspM8YF4CPYTPJllCJ00MSl5YBo1");

const StripeProvider = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;
