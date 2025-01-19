import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createBooking,displayUserBookings } from "../controllers/booking.controller.js";

const router = express.Router();

router.route("/create-booking").post(isAuthenticated, createBooking);
router.route("/get-user-bookings").get(isAuthenticated, displayUserBookings);


export default router;
