import express from "express";
import dotenv from "dotenv";
import {createPaymentIntent,savePayment} from "../controllers/payment.controller.js";

dotenv.config();
const router = express.Router();
router.route("/postPayment").post(createPaymentIntent);
router.route("/savePayment").post(savePayment);







export default router;