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
      // Get current system date and time
      const currentSystemTime = new Date();
      const bookingDateTime = new Date(bookingDate);
      
      // First compare just the dates (ignoring time)
      if (startOfDay(currentSystemTime) > startOfDay(bookingDateTime)) {
        // If booking date is in the past, it's expired
        return true;
      } else if (startOfDay(currentSystemTime) < startOfDay(bookingDateTime)) {
        // If booking date is in the future, it's not expired
        return false;
      }
      
      // If it's the same day, compare with the end time
      if (isSameDay(currentSystemTime, bookingDateTime)) {
        const [endHours, endMinutes] = endTime.split(':').map(Number);
        const bookingEndTime = new Date(bookingDateTime);
        bookingEndTime.setHours(endHours, endMinutes, 0, 0);
        
        // Debug logging
        console.log('Same day comparison:');
        console.log('Current System Time:', currentSystemTime);
        console.log('Booking End Time:', bookingEndTime);
        
        return currentSystemTime > bookingEndTime;
      }
      
      return false;
    } catch (error) {
      console.error("Error checking if booking is expired:", error);
      return false;
    }
  };

  // Sort bookings by date and time
  const sortedBookings = [...bookings].sort((a, b) => {
    const aDate = new Date(a.bookingDate);
    const bDate = new Date(b.bookingDate);
    const [aHours, aMinutes] = a.startTime.split(':').map(Number);
    const [bHours, bMinutes] = b.startTime.split(':').map(Number);
    
    aDate.setHours(aHours, aMinutes, 0, 0);
    bDate.setHours(bHours, bMinutes, 0, 0);
    
    return bDate - aDate; // Most recent first
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
              const expired = isBookingExpired(booking.bookingDate, booking.endTime);
              
              return (
                <div
                  key={booking._id}
                  className={`flex items-center border rounded-lg shadow p-4 ${
                    expired ? 'bg-gray-50 opacity-75' : 'bg-gray-50'
                  }`}
                >
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
                      {expired
                        ? "Expired"
                        : booking.status || "Pending"}
                    </p>
                  </div>
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
