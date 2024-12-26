import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createBooking } from "../controllers/booking.controller.js";

const router = express.Router();

router.route("/create-booking").post(isAuthenticated, createBooking);

export default router;
