const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus,
  rateBooking,
} = require("../controllers/bookingController");

// Booking routes
router.post("/create", protect, createBooking);
router.get("/get-user-bookings/:userId", protect, getUserBookings);
router.get("/get-all-bookings", protect, getAllBookings);
router.put("/update-status/:bookingId", protect, updateBookingStatus);
router.post("/rate/:bookingId", protect, rateBooking);

module.exports = router; 