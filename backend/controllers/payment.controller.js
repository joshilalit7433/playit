import {Payment} from "../models/payment.model.js";
import Stripe from "stripe";
const stripe = Stripe('sk_test_51QgjNe09HGOXkg8vYfE1DQdJgL5o2giXmPAZoXAiqE90hguNLvrZKkPP7dlQCrqY3pk1szjl7pMM7ggWKMT3TwEx00J1kFE18d');

export const createPaymentIntent = async (req, res) => {
    try {
      const { amount, currency, userId } = req.body;

      if (!amount || !currency || !userId) {
        return res.status(400).json({ error: "Missing required fields." });
      }
  
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), 
        currency,
        metadata: { userId }, 
      });
  
      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
        message: "Payment Intent created successfully.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  
