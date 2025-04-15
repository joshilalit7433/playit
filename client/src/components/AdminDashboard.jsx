import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { TURF_API_END_POINT } from "../utils/constant.js";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const [pendingTurfs, setPendingTurfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get user from Redux store
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        // Check if user exists and has admin role
        if (!user || user.role !== "admin") {
          toast.error("You don't have permission to access this page", {
            position: "top-center",
            theme: "dark",
          });
          navigate("/login");
          return;
        }

        fetchPendingTurfs();
      } catch (error) {
        toast.error("Authentication failed", {
          position: "top-center",
          theme: "dark",
        });
        navigate("/login");
      }
    };

    const fetchPendingTurfs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${TURF_API_END_POINT}/getPendingTurfs`,
          { withCredentials: true }
        );
        setPendingTurfs(response.data.turfs);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          toast.error("Access denied. Only admins can view this page", {
            position: "top-center",
            theme: "dark",
          });
          navigate("/login");
        } else {
          // toast.error("Failed to fetch pending turf requests", {
          //   position: "top-center",
          //   theme: "dark",
          // });
        }
        setLoading(false);
      }
    };

    checkAdminAccess();
  }, [navigate, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>

      {pendingTurfs.length === 0 ? (
        <div className="text-center text-xl text-gray-500 mt-10">
          No pending turf requests available
        </div>
      ) : (
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
                      e.target.src = "/images/placeholder.jpg";
                    }}
                  />
                  <h2 className="text-xl font-semibold mb-2">{turf.name}</h2>
                  <p className="text-gray-600 mb-2">
                    Location: {turf.location}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Sport: {turf.sports_type}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Price: ₹{turf.price}/hour
                  </p>
                  {/* <p className="text-gray-600 mb-2">
                    Owner: {turf.owner ? turf.owner.fullname : "Unknown"}
                  </p> */}
                  <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm mt-2">
                    Status: Pending
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
