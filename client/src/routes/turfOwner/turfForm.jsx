import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { TURF_API_END_POINT } from "../../utils/constant.js";

const TurfForm = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in to add a turf", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      navigate("/login");
    }
  }, [user, navigate]);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    turfName: "",
    turfImages: "",
    turfAddress: "",
    location: "",
    pricePerHour: "",
    description: "",
    sports_type: "",
    linkes: "",
  });

  const sportsTypes = ["Cricket", "Football", "Badminton"];

  const locations = [
    "Borivali",
    "Bandra",
    "Vasai",
    "Bhayandar",
    "Andheri",
    "Malad",
    "Kandivali",
    "Mira Road",
    "Goregaon",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check all required fields
    const requiredFields = [
      { field: "turfName", label: "Turf Name" },
      { field: "turfImages", label: "Turf Images" },
      { field: "turfAddress", label: "Address" },
      { field: "location", label: "Location" },
      { field: "pricePerHour", label: "Price per hour" },
      { field: "description", label: "Description" },
      { field: "sports_type", label: "Sports Type" },
      { field: "linkes", label: "Google Maps Link" },
    ];

    for (const { field, label } of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill in the ${label} field`, {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
        return;
      }
    }

    setLoading(true);

    try {
      console.log("Submitting form data:", formData);
      const response = await axios.post(
        `${TURF_API_END_POINT}/postTurf`,
        {
          name: formData.turfName,
          location: formData.location,
          description: formData.description,
          images: formData.turfImages,
          price: Number(formData.pricePerHour),
          sports_type: formData.sports_type,
          ratings: [],
          linkes: formData.linkes,
          address: formData.turfAddress,
          state: false,
          owner: user?._id || "64f5c1d55c3d3e001c8947a1",
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Turf added successfully! Waiting for admin approval.", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
        // Reset form
        setFormData({
          turfName: "",
          turfImages: "",
          turfAddress: "",
          location: "",
          pricePerHour: "",
          description: "",
          sports_type: "",
          linkes: "",
        });
      }
    } catch (error) {
      console.error("Error details:", error);

      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);

        // Check for specific error types
        if (error.response.status === 401) {
          toast.error(
            "You must be logged in to add a turf. Please log in again.",
            {
              position: "top-center",
              autoClose: 3000,
              theme: "dark",
            }
          );
          // Optionally redirect to login
          // navigate('/login');
          return;
        }
      }

      toast.error(
        error.response?.data?.message ||
          "Failed to add turf. Please try again.",
        {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "PLAYit");
    data.append("cloud_name", "smash007");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/smash007/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const uploadedImageURL = await res.json();
      setFormData({ ...formData, turfImages: uploadedImageURL.url });
      setLoading(false);
    } catch (error) {
      toast.error("Image upload failed. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      setLoading(false);
    }
  };

  return (
    <div className="mt-14 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Add New Turf
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Turf Name
                </label>
                <input
                  type="text"
                  name="turfName"
                  value={formData.turfName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                  placeholder="Enter turf name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Location</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sports Type
              </label>
              <select
                name="sports_type"
                value={formData.sports_type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="">Select Sport</option>
                {sportsTypes.map((sport) => (
                  <option key={sport} value={sport.toLowerCase()}>
                    {sport}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Turf Images
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  name="turfImages"
                  onChange={handleFileUpload}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  accept="image/*"
                />
                {loading && (
                  <div className="flex items-center text-green-600">
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Uploading...
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address
              </label>
              <textarea
                name="turfAddress"
                value={formData.turfAddress}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows="3"
                required
                placeholder="Enter detailed address"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Google Maps Link
              </label>
              <div className="relative">
                <input
                  type="url"
                  name="linkes"
                  value={formData.linkes}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                  placeholder="Enter Google Maps location link"
                />
                <div className="absolute right-3 top-2.5 text-sm text-gray-500">
                  <a
                    href="https://www.google.com/maps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700"
                  >
                    Get Link
                  </a>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Open Google Maps, find your location, click share and copy the
                link
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price per hour (₹)
              </label>
              <input
                type="number"
                name="pricePerHour"
                value={formData.pricePerHour}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
                placeholder="Enter price per hour"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows="4"
                required
                placeholder="Enter turf description"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 disabled:bg-gray-400 font-semibold"
            >
              {loading ? "Processing..." : "Add Turf"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TurfForm;
