import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { format, isSameDay, startOfDay } from "date-fns";

function DisplayBookings() {
  const { user } = useSelector((store) => store.auth);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [systemTime, setSystemTime] = useState(new Date());
  const [ratings, setRatings] = useState({});

  // Update system time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setSystemTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch bookings and user ratings
  useEffect(() => {
    const fetchBookingsAndRatings = async () => {
      try {
        setLoading(true);

        // Fetch bookings
        const bookingsResponse = await axios.get(
          `http://localhost:8000/api/v1/booking/get-user-bookings/${user?._id}`
        );
        const fetchedBookings = bookingsResponse.data.bookings || [];
        setBookings(fetchedBookings);

        // Fetch ratings for each turf
        const userRatings = {};

        // Create an array of promises for fetching ratings
        const ratingPromises = fetchedBookings.map(async (booking) => {
          if (booking.turfId && booking.turfId._id) {
            try {
              const ratingResponse = await axios.get(
                `http://localhost:8000/api/v1/turf/${booking.turfId._id}/user-rating/${user?._id}`
              );

              if (
                ratingResponse.data.success &&
                ratingResponse.data.rating !== undefined
              ) {
                userRatings[booking._id] = ratingResponse.data.rating;
              }
            } catch (ratingError) {
              console.error(
                "Error fetching rating for turf:",
                booking.turfId._id,
                ratingError
              );
            }
          }
        });

        // Wait for all rating requests to complete
        await Promise.all(ratingPromises);

        // Update ratings state
        setRatings(userRatings);
      } catch (err) {
        console.error("Error fetching bookings:", err.message);
        setError("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchBookingsAndRatings();
    }
  }, [user]);

  // Check if booking is expired
  const isBookingExpired = (bookingDate, endTime) => {
    try {
      const currentSystemTime = new Date();
      const bookingDateTime = new Date(bookingDate);

      if (startOfDay(currentSystemTime) > startOfDay(bookingDateTime)) {
        return true;
      } else if (startOfDay(currentSystemTime) < startOfDay(bookingDateTime)) {
        return false;
      }

      if (isSameDay(currentSystemTime, bookingDateTime)) {
        const [endHours, endMinutes] = endTime.split(":").map(Number);
        const bookingEndTime = new Date(bookingDateTime);
        bookingEndTime.setHours(endHours, endMinutes, 0, 0);
        return currentSystemTime > bookingEndTime;
      }

      return false;
    } catch (error) {
      console.error("Error checking if booking is expired:", error);
      return false;
    }
  };

  // Handle star click for rating
  const handleRating = async (turfId, bookingId, rating) => {
    try {
      const currentRating = ratings[bookingId] || 0;
      const newRating = currentRating === rating ? rating - 1 : rating;

      // Update local state
      setRatings((prevRatings) => ({
        ...prevRatings,
        [bookingId]: newRating,
      }));

      // Send rating to backend
      const response = await axios.post(
        `http://localhost:8000/api/v1/turf/${turfId}/rating`,
        { rating: newRating, userId: user._id }
      );

      if (!response.data.success) {
        setRatings((prevRatings) => ({
          ...prevRatings,
          [bookingId]: currentRating,
        }));
        console.error("Failed to save rating:", response.data.message);
      }
    } catch (error) {
      console.error("Error saving rating:", error);
      setRatings((prevRatings) => ({
        ...prevRatings,
        [bookingId]: ratings[bookingId],
      }));
    }
  };

  // Render star rating UI
  const renderStars = (turfId, bookingId) => {
    const currentRating = ratings[bookingId] || 0;

    return (
      <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
        <p className="text-sm font-medium text-gray-700 mb-2">
          {currentRating > 0 ? "Your rating" : "Rate your experience"}
        </p>
        <div className="flex items-center justify-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRating(turfId, bookingId, star)}
              className={`focus:outline-none transform hover:scale-110 transition-transform duration-200 ${
                star <= currentRating ? "text-yellow-400" : "text-gray-300"
              }`}
              title={
                currentRating === star
                  ? "Click to deselect this star"
                  : `Rate ${star} stars`
              }
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>
        {currentRating > 0 && (
          <p className="text-center text-sm text-gray-600 mt-2">
            You rated: {currentRating} star{currentRating !== 1 ? "s" : ""}
          </p>
        )}
      </div>
    );
  };

  // Sort bookings by createdAt (most recent first)
  const sortedBookings = [...bookings].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="bg-gray-100 min-h-screen mt-[50px] flex justify-center items-center py-10">
      <div className="max-w-4xl w-full p-4 md:p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-center">
          Your Bookings
        </h1>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : sortedBookings.length > 0 ? (
          <div className="space-y-4 md:space-y-6">
            {sortedBookings.map((booking) => {
              const expired = isBookingExpired(
                booking.bookingDate,
                booking.endTime
              );

              return (
                <div
                  key={booking._id}
                  className={`flex flex-col border rounded-lg shadow p-3 md:p-4 ${
                    expired ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-start">
                    {/* Turf Image */}
                    <div className="w-full md:w-1/4 mb-3 md:mb-0">
                      <img
                        src={
                          booking.turfId?.images ||
                          "https://via.placeholder.com/150"
                        }
                        alt={booking.turfId?.name || "Turf Image"}
                        className="w-full h-32 rounded-lg object-cover"
                      />
                    </div>

                    {/* Booking Details */}
                    <div className="w-full md:w-2/4 md:px-4">
                      <p className="text-lg font-semibold">
                        {booking.turfId?.name || "Unknown"}
                      </p>
                      <p className="text-sm text-gray-700 mt-1 md:mt-2">
                        <strong>Price:</strong> ₹{booking.turfId?.price || 0}
                        /hour
                      </p>
                      <p className="text-sm text-gray-700 mt-1 md:mt-2">
                        <strong>Location:</strong>{" "}
                        {booking.turfId?.location || "Unknown"}
                      </p>
                      <p className="text-sm text-gray-700 mt-1 md:mt-2">
                        <strong>Amount Paid:</strong>{" "}
                        {booking.amountPaid || "Unknown"}
                      </p>
                      <p className="text-sm text-gray-700 mt-1 md:mt-2">
                        <strong>Date:</strong>{" "}
                        {format(new Date(booking.bookingDate), "dd/MM/yyyy")}
                      </p>
                      <p className="text-sm text-gray-700 mt-1 md:mt-2">
                        <strong>Time:</strong> {booking.startTime} -{" "}
                        {booking.endTime}
                      </p>
                      <p className="text-sm text-gray-500 mt-1 md:mt-2">
                        <strong>Booked on:</strong>{" "}
                        {format(
                          new Date(booking.createdAt),
                          "dd/MM/yyyy HH:mm"
                        )}
                      </p>
                    </div>

                    {/* Booking Status */}
                    <div className="w-full md:w-1/4 text-center mt-3 md:mt-0">
                      <p
                        className={`text-sm font-medium p-2 rounded-lg ${
                          expired
                            ? "bg-gray-100 text-gray-600"
                            : booking.status === "confirmed"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {expired ? "Expired" : booking.status || "Pending"}
                      </p>
                    </div>
                  </div>

                  {/* Rating UI - Show only if expired */}
                  {expired && (
                    <div className="mt-4">
                      {renderStars(booking.turfId?._id, booking._id)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">No bookings found.</p>
        )}
      </div>
    </div>
  );
}

export default DisplayBookings;
