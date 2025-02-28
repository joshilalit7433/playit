import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { TURF_API_END_POINT } from "../utils/constant.js";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [pendingTurfs, setPendingTurfs] = useState([]);

  useEffect(() => {
    const fetchPendingTurfs = async () => {
      try {
        const response = await axios.get(
          `${TURF_API_END_POINT}/getPendingTurfs`
        );
        setPendingTurfs(response.data.turfs);
      } catch (error) {
        toast.error("Failed to fetch pending turf requests", {
          position: "top-center",
          theme: "dark",
        });
      }
    };

    fetchPendingTurfs();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.patch(`${TURF_API_END_POINT}/approveTurf/${id}`);
      toast.success("Turf approved successfully!", {
        position: "top-center",
        theme: "dark",
      });
      // Refresh the pending turfs list
      const response = await axios.get(`${TURF_API_END_POINT}/getPendingTurfs`);
      setPendingTurfs(response.data.turfs);
    } catch (error) {
      toast.error("Failed to approve turf", {
        position: "top-center",
        theme: "dark",
      });
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.delete(`${TURF_API_END_POINT}/rejectTurf/${id}`);
      toast.success("Turf rejected successfully!", {
        position: "top-center",
        theme: "dark",
      });
      // Refresh the pending turfs list
      const response = await axios.get(`${TURF_API_END_POINT}/getPendingTurfs`);
      setPendingTurfs(response.data.turfs);
    } catch (error) {
      toast.error("Failed to reject turf", {
        position: "top-center",
        theme: "dark",
      });
    }
  };

  return (
    <div className=" min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pendingTurfs.map((turf) => (
          <div key={turf._id} className="bg-white rounded-lg shadow-lg p-6">
            <Link to={`/admin/dashboard/${turf._id}`}>
              <div className="flex flex-col items-center">
                <img
                  src={turf.images}
                  alt={turf.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                  onError={(e) => {
                    e.target.src = "./images/placeholder.jpg";
                  }}
                />
                <h2 className="text-xl font-semibold mb-2">{turf.name}</h2>
                <p className="text-gray-600 mb-2">Location: {turf.location}</p>
                <p className="text-gray-600 mb-2">Sport: {turf.sports_type}</p>
                <p className="text-gray-600 mb-4">Price: ₹{turf.price}/hour</p>
              </div>
            </Link>

            <div className="flex space-x-4 justify-center mt-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleApprove(turf._id);
                }}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Approve
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleReject(turf._id);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
