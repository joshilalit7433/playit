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
  const [ratings, setRatings] = useState({}); // NEW: Ratings state

  // Update system time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setSystemTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/booking/get-user-bookings/${user?._id}`
        );
        setBookings(response.data.bookings || []);
      } catch (err) {
        console.error("Error fetching bookings:", err.message);
        setError("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchBookings();
    }
  }, [user]);

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

  // NEW: Handle star click (rating selection and deselection)
  const handleRating = async (bookingId, rating) => {
    try {
      const currentRating = ratings[bookingId];
      const newRating = currentRating === rating ? rating - 1 : rating;

      // Update local state
      setRatings((prevRatings) => ({
        ...prevRatings,
        [bookingId]: newRating,
      }));
      
      // Send rating to backend
      const response = await axios.post(
        `http://localhost:8000/api/v1/booking/rate/${bookingId}`,
        { rating: newRating }
      );

      if (!response.data.success) {
        // If the API call fails, revert the local state
        setRatings((prevRatings) => ({
          ...prevRatings,
          [bookingId]: currentRating,
        }));
        console.error("Failed to save rating:", response.data.message);
      }
    } catch (error) {
      console.error("Error saving rating:", error);
      // Revert the local state on error
      setRatings((prevRatings) => ({
        ...prevRatings,
        [bookingId]: ratings[bookingId],
      }));
    }
  };

  // NEW: Render stars component with improved design and individual star deselection
  const renderStars = (bookingId) => {
    const currentRating = ratings[bookingId] || 0;

    return (
      <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
        <p className="text-sm font-medium text-gray-700 mb-2">
          Rate your experience
        </p>
        <div className="flex items-center justify-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRating(bookingId, star)}
              className={`focus:outline-none transform hover:scale-110 transition-transform duration-200 ${
                star <= currentRating ? "text-yellow-400" : "text-gray-300"
              }`}
              title={currentRating === star ? "Click to deselect this star" : `Rate ${star} stars`}
            >
              <svg
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>
        {currentRating > 0 ? (
          <div className="text-center mt-2">
           
          </div>
        ) : null}
      </div>
    );
  };

  const sortedBookings = [...bookings].sort((a, b) => {
    const aDate = new Date(a.bookingDate);
    const bDate = new Date(b.bookingDate);
    const [aHours, aMinutes] = a.startTime.split(":").map(Number);
    const [bHours, bMinutes] = b.startTime.split(":").map(Number);

    aDate.setHours(aHours, aMinutes, 0, 0);
    bDate.setHours(bHours, bMinutes, 0, 0);

    return bDate - aDate;
  });

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="max-w-4xl w-full p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Your Bookings
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading bookings...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : sortedBookings.length > 0 ? (
          <div className="space-y-4">
            {sortedBookings.map((booking) => {
              const expired = isBookingExpired(
                booking.bookingDate,
                booking.endTime
              );

              return (
                <div
                  key={booking._id}
                  className={`flex flex-col border rounded-lg shadow p-4 ${
                    expired ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <div className="flex items-center">
                    {/* Turf Image */}
                    <div className="w-1/4">
                      <img
                        src={
                          booking.turfId?.images ||
                          "https://via.placeholder.com/150"
                        }
                        alt={booking.turfId?.name || "Turf Image"}
                        className="w-full h-full rounded-lg object-cover"
                      />
                    </div>

                    {/* Booking Details */}
                    <div className="w-2/4 px-4">
                      <p className="text-lg font-semibold">
                        Turf Name: {booking.turfId?.name || "Unknown"}
                      </p>
                      <p className="text-sm text-gray-700 mt-2">
                        <strong>Price:</strong> ₹{booking.turfId?.price || 0}/hour
                      </p>
                      <p className="text-sm text-gray-700 mt-2">
                        <strong>Location:</strong>{" "}
                        {booking.turfId?.location || "Unknown"}
                      </p>
                      <p className="text-sm text-gray-700 mt-2">
                        <strong>Date:</strong>{" "}
                        {format(new Date(booking.bookingDate), "dd/MM/yyyy")}
                      </p>
                      <p className="text-sm text-gray-700 mt-2">
                        <strong>Start Time:</strong> {booking.startTime}
                      </p>
                      <p className="text-sm text-gray-700 mt-2">
                        <strong>End Time:</strong> {booking.endTime}
                      </p>
                    </div>

                    {/* Booking Status */}
                    <div className="w-1/4 text-center">
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

                  {/* Rating Section for Expired Bookings */}
                  {expired && (
                    <div className="mt-4 border-t pt-4">
                      {renderStars(booking._id)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500">No bookings found.</p>
        )}
      </div>
    </div>
  );
}

export default DisplayBookings;
