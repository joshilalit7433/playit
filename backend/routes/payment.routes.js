import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import {createPaymentIntent} from "../controllers/payment.controller.js";

dotenv.config();
const router = express.Router();
router.route("/postPayment").post(createPaymentIntent);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// router.route("/postPayment" , async (req , res) => {
//     try{
//      const {amount , currenry , payementMethodType} = req.body;
     
//      if (!amount || !currency || !payementMethodType){
//         return res.status(400).json({error:"message required field"});
//      }

//      const payementIntent = await stripe.paymentIntents.create({
//         amount: Math.round(amount*100),
//         currenry,
//         payement_method_types :[payementMethodType],
//      });
//      res.status(200).json({
//         clientSecret : payementIntent.client_secret,
//         message:"Payement intent created successfully.",
//      });
//     }catch(error){
//         console.error("error creating payemetn",error);
//         res.status(500).json({error:"failed to create payement intent"});
//     }
// });

// app.post()


export default router;