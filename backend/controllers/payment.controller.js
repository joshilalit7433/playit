import {Payment} from "../models/payment.model.js";
import Stripe from "stripe";
const stripe = Stripe('sk_test_51QgjNe09HGOXkg8vYfE1DQdJgL5o2giXmPAZoXAiqE90hguNLvrZKkPP7dlQCrqY3pk1szjl7pMM7ggWKMT3TwEx00J1kFE18d');

 export const createPaymentIntent = async (req, res) => {
    try {
      const { amount, currency, userId } = req.body;


       // Validate required fields
    if (!amount || !currency || !userId) {
        return res.status(400).json({ error: 'something is missing' });
      }
  
      // Create a PaymentIntent
      const paymentIntent = await stripe.paymentIntents.create({
        amount, // Amount in smallest currency unit
        currency,
        metadata: { userId }, // Attach userId for reference
      });

      

  
      // Save initial payment details to MongoDB
      const payment = new Payment({
        paymentId: paymentIntent.id,
        userId,
        amount,
        currency,
        status: 'created',
        metadata: paymentIntent.metadata,
      });
  
      await payment.save();
  
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  