const Booking = require("../models/bookingModel");

// @desc    Rate a booking
// @route   POST /api/v1/booking/rate/:bookingId
// @access  Private
const rateBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { rating } = req.body;

    console.log('Rating request received:', { bookingId, rating, userId: req.user._id });

    // Validate rating
    if (rating < 0 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 0 and 5",
      });
    }

    // Find the booking
    const booking = await Booking.findById(bookingId);
    console.log('Found booking:', booking);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Check if the booking belongs to the user
    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to rate this booking",
      });
    }

    // Update the booking with the rating
    booking.rating = rating;
    const updatedBooking = await booking.save();
    console.log('Updated booking:', updatedBooking);

    res.status(200).json({
      success: true,
      message: "Rating updated successfully",
      data: updatedBooking,
    });
  } catch (error) {
    console.error("Error in rateBooking:", error);
    res.status(500).json({
      success: false,
      message: "Error updating rating",
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Placeholder functions for other controllers
const createBooking = async (req, res) => {
  // Implementation here
};

const getUserBookings = async (req, res) => {
  // Implementation here
};

const getAllBookings = async (req, res) => {
  // Implementation here
};

const updateBookingStatus = async (req, res) => {
  // Implementation here
};

module.exports = {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus,
  rateBooking,
}; 