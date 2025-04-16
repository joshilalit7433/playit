import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DisplayTOBooking = () => {
  const { user } = useSelector((store) => store.auth);
  const [ownedTurfs, setOwnedTurfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalBalance, setTotalBalance] = useState(0); // 👈 new state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOwnedTurfsAndBalance = async () => {
      try {
        if (!user?._id) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        // Step 1: Fetch Turfs
        const turfsResponse = await axios.get(
          `http://localhost:8000/api/v1/turf/owner-turfs/${user._id}`
        );

        if (turfsResponse.data.success) {
          const turfs = turfsResponse.data.turfs;
          setOwnedTurfs(turfs);

          // Step 2: For each turf, fetch bookings and calculate total
          let total = 0;
          for (const turf of turfs) {
            const bookingsRes = await axios.get(
              `http://localhost:8000/api/v1/booking/get-turf-bookings/${turf._id}`
            );

            const turfBookings = bookingsRes?.data?.bookings || [];
            const turfTotal = turfBookings.reduce(
              (acc, booking) => acc + (booking.amountPaid || 0),
              0
            );
            total += turfTotal;
          }

          setTotalBalance(total); // 👈 update total balance state
        } else {
          setError("Failed to fetch owned turfs");
        }
      } catch (err) {
        console.error("Error fetching turf data:", err);
        setError("Failed to fetch turf data. Please try again later.");
        toast.error("Failed to fetch turf data", {
          position: "top-center",
          theme: "dark",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOwnedTurfsAndBalance();
  }, [user]);

  const handleViewDetails = (turf) => {
    navigate(`/turfs/${turf._id}`, { state: { turf } });
  };

  return (
    <div className="mt-10 bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Your Turfs</h1>
          <div className="text-xl font-semibold text-green-600">
            Total Earnings: ₹{totalBalance}
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
        ) : ownedTurfs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ownedTurfs.map((turf) => (
              <div
                key={turf._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={
                      turf.images ||
                      "https://via.placeholder.com/400x200?text=No+Image"
                    }
                    alt={turf.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                      {turf.name}
                    </h2>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        turf.state
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {turf.state ? "Approved" : "Pending Approval"}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{turf.location}</p>

                  <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-700 font-medium">
                      ₹{turf.price}/hour
                    </p>
                    <p className="text-gray-700 font-medium">
                      {turf.sports_type}
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleViewDetails(turf)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() => navigate(`/turf-bookings/${turf._id}`)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition duration-200"
                    >
                      View Bookings
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              No Turfs Found
            </h2>
            <p className="text-gray-600 mb-6">
              You haven't created any turfs yet. Start by adding your first
              turf.
            </p>
            <button
              onClick={() => navigate("/turfform")}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Add Turf
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayTOBooking;
