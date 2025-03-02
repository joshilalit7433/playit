import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { useSelector } from "react-redux";

const DisplayTurfBooking = () => {
  const { turfId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const [turf, setTurf] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTurfAndBookings = async () => {
      try {
        if (!user?._id) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        if (!turfId) {
          setError("Turf ID is missing");
          setLoading(false);
          return;
        }

        // First fetch the turf details to verify ownership
        const turfResponse = await axios.get(
          `http://localhost:8000/api/v1/turf/turf/${turfId}`
        );

        if (!turfResponse.data.success) {
          setError("Failed to fetch turf details");
          setLoading(false);
          return;
        }

        const turfData = turfResponse.data.turf;

        // Verify that the current user is the owner of this turf
        if (turfData.owner !== user._id) {
          setError("You don't have permission to view these bookings");
          setLoading(false);
          return;
        }

        setTurf(turfData);

        // Then fetch all bookings for this turf
        const bookingsResponse = await axios.get(
          `http://localhost:8000/api/v1/booking/get-turf-bookings/${turfId}`
        );

        if (bookingsResponse.data.bookings) {
          setBookings(bookingsResponse.data.bookings);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("No Bookings Found");
        toast.error("Failed to fetch data", {
          position: "top-center",
          theme: "dark",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTurfAndBookings();
  }, [turfId, user]);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/booking/update-booking-status/${bookingId}`,
        {
          status: newStatus,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        // Update the booking in the state
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: newStatus }
              : booking
          )
        );

        toast.success(`Booking ${newStatus} successfully`, {
          position: "top-center",
          theme: "dark",
        });
      }
    } catch (error) {
      console.error(`Error ${newStatus} booking:`, error);
      toast.error(`Failed to ${newStatus} booking`, {
        position: "top-center",
        theme: "dark",
      });
    }
  };

  return (
    <div className="mt-10 bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
            >
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to My Turfs
            </button>
            <h1 className="text-3xl font-bold text-gray-800">
              {turf?.name} - Bookings
            </h1>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 p-4 rounded-md text-red-700 text-center">
            {error}
          </div>
        ) : bookings.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date & Time
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Payment
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {booking.userId?.fullname || "Unknown User"}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.userId?.email || "No email"}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.userId?.mobilenumber || "No phone"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {format(new Date(booking.bookingDate), "dd MMM yyyy")}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.startTime} - {booking.endTime}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ₹{booking.amountPaid}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.paymentStatus}
                        </div>
                        <div className="text-xs text-gray-400">
                          ID: {booking.paymentId?.substring(0, 10)}...
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              No Bookings Found
            </h2>
            <p className="text-gray-600">
              There are currently no bookings for this turf.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayTurfBooking;
