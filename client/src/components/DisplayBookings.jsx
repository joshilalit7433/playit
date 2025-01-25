import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { format } from "date-fns"; // Importing date-fns for date formatting

function DisplayBookings() {
  const { user } = useSelector((store) => store.auth); // Get logged-in user info from Redux
  const [bookings, setBookings] = useState([]); // State to store bookings
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Fetch bookings for the logged-in user
        const response = await axios.get(
          `http://localhost:8000/api/v1/booking/get-user-bookings/${user?._id}`
        );
        setBookings(response.data.bookings || []); // Update bookings state
      } catch (err) {
        console.error("Error fetching bookings:", err.message);
        setError("Failed to fetch bookings.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (user?._id) {
      fetchBookings();
    }
  }, [user]);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="max-w-4xl w-full p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center">Your Bookings</h1>
        {loading ? (
          <p className="text-center text-gray-500">Loading bookings...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="flex items-center border rounded-lg shadow p-4 bg-gray-50"
              >
                {/* Turf Image */}
                <div className="w-1/4">
                  <img
                    src={booking.turfId?.images || "https://via.placeholder.com/150"}
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
                    <strong>Location:</strong> {booking.turfId?.location || "Unknown"}
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    <strong>Date:</strong>{" "}
                    {format(new Date(booking.createdAt), "dd/MM/yyyy")}
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
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {booking.status || "Pending"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No bookings found.</p>
        )}
      </div>
    </div>
  );
}

export default DisplayBookings;
