import { Booking } from "../models/booking.model.js";
import { Turf } from "../models/turf.model.js";
import { User } from "../models/user.model.js";

export const createBooking = async (req, res) => {
  try {
    const {
      turfId,
      userId,
      paymentId,
      bookingDate,
      startTime,
      endTime,
      status,
      amountPaid,
      paymentStatus,
    } = req.body;

    // Check if any required field is missing
    if (
      !turfId ||
      !userId ||
      !paymentId ||
      !bookingDate ||
      !startTime ||
      !endTime ||
      !status ||
      !amountPaid ||
      !paymentStatus
    ) {
      return res.status(400).json({
        message: "Missing required fields",
        required: {
          turfId,
          userId,
          paymentId,
          bookingDate,
          startTime,
          endTime,
          status,
          amountPaid,
          paymentStatus,
        },
      });
    }

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

    // Fetch bookings for the user, including turf details
    const bookings = await Booking.find({ userId })
      .populate({
        path: "turfId", // Populate turf details
        select: "name location price images", // Include only necessary fields
      })
      .sort({ bookingDate: -1 }); // Sort by booking date, most recent first

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this user." });
    }

    return res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res.status(500).json({ message: "Failed to fetch bookings." });
  }
};

