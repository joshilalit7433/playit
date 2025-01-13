import express from "express";
import {createPaymentIntent} from "../controllers/payment.controller.js"

const router = express.Router();

router.route("/postPayment").post(createPaymentIntent);


export default router;