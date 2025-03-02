import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { TURF_API_END_POINT } from "../utils/constant.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminTurfDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [turf, setTurf] = useState(null);
  const [loading, setLoading] = useState(true);
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
      } catch (error) {
        toast.error("Authentication failed", {
          position: "top-center",
          theme: "dark",
        });
        navigate("/login");
      }
    };

    checkAdminAccess();
  }, [navigate, user]);

  useEffect(() => {
    const fetchTurfDetails = async () => {
      try {
        const response = await axios.get(`${TURF_API_END_POINT}/turf/${id}`);
        setTurf(response.data.turf);
      } catch (error) {
        toast.error("Failed to fetch turf details", {
          position: "top-center",
          theme: "dark",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTurfDetails();
  }, [id]);

  const handleApprove = async () => {
    try {
      await axios.patch(`${TURF_API_END_POINT}/approveTurf/${id}`, {
        state: true,
      });
      toast.success("Turf approved successfully!", {
        position: "top-center",
        theme: "dark",
      });
    } catch (error) {
      toast.error("Failed to approve turf", {
        position: "top-center",
        theme: "dark",
      });
    }
  };

  const handleReject = async () => {
    try {
      await axios.delete(`${TURF_API_END_POINT}/rejectTurf/${id}`);
      toast.success("Turf rejected successfully!", {
        position: "top-center",
        theme: "dark",
      });
    } catch (error) {
      toast.error("Failed to reject turf", {
        position: "top-center",
        theme: "dark",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!turf) {
    return <div>Turf not found</div>;
  }

  return (
    <div className="mt-12 min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={turf.images}
              alt={turf.name}
              className="w-full h-96 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = "./images/placeholder.jpg";
              }}
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{turf.name}</h1>
            <div className="space-y-4">
              <p>
                <span className="font-semibold">Location:</span> {turf.location}
              </p>
              <p>
                <span className="font-semibold">Sport Type:</span>{" "}
                {turf.sports_type}
              </p>
              <p>
                <span className="font-semibold">Price:</span> ₹{turf.price}/hour
              </p>
              <p>
                <span className="font-semibold">Address:</span> {turf.address}
              </p>
              <p>
                <span className="font-semibold">Description:</span>{" "}
                {turf.description}
              </p>
              <div>
                <span className="font-semibold">Google Maps:</span>{" "}
                <a
                  href={turf.linkes}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  View Location
                </a>
              </div>
            </div>

            <div className="mt-8 flex space-x-4">
              <button
                onClick={handleApprove}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Approve Turf
              </button>
              <button
                onClick={handleReject}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Reject Turf
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTurfDetails;
