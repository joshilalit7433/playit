import { Booking } from "../models/booking.model.js";
import { Turf } from "../models/turf.model.js";
import { User } from "../models/user.model.js";

export const createBooking = async (req, res) => {
  try {
    const {
      turfId,
      userId,
      bookingDate,
      startTime,
      endTime,
      amountPaid,
      paymentDetails,
    } = req.body;

    // Validation: Check if Turf exists
    const turfExists = await Turf.findById(turfId);
    if (!turfExists) {
      return res.status(404).json({ message: "Turf not found." });
    }

    // Validation: Check if User exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check for conflicting bookings
    const conflictingBooking = await Booking.findOne({
      turfId,
      bookingDate,
      $or: [{ startTime: { $lt: endTime }, endTime: { $gt: startTime } }],
    });

    if (conflictingBooking) {
      return res
        .status(409)
        .json({ message: "Time slot already booked for this turf." });
    }

    // Create and save the booking
    const booking = await Booking.create(req.body);

    return res.status(201).json({
      message: "Booking created successfully.",
      booking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const displayUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ userId }); // Replace with your DB query
    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
 
};
