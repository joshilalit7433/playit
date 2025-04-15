import React, { useState, useEffect } from "react";
import axios from "axios";
import { TURF_API_END_POINT } from "../utils/constant.js";
import { useNavigate } from "react-router-dom";

export default function Turf({ filters }) {
  const [turfs, setTurfs] = useState([]);
  const navigate = useNavigate();

  const normalizeLocation = (location) => {
    return location.split(" ")[0].toLowerCase();
  };

  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const response = await axios.get(`${TURF_API_END_POINT}/getTurf`);
        const approvedTurfs = response.data.turfs.filter(
          (turf) => turf.state === true
        );
        setTurfs(approvedTurfs);
      } catch (error) {
        console.error("Error fetching turfs:", error);
      }
    };

    fetchTurfs();
  }, []);

  const handleCardClick = (turf) => {
    navigate(`/turfs/${turf._id}`, { state: { turf } });
  };

  const isPriceInRange = (price, range) => {
    if (!range) return true;
    const [min, max] = range.split("-").map(Number);
    return price >= min && price <= max;
  };

  const filteredTurfs = turfs.filter((turf) => {
    const matchesLocation =
      !filters.Location ||
      normalizeLocation(turf.location) === normalizeLocation(filters.Location);
    const matchesSport = !filters.Sports || turf.sports_type === filters.Sports;
    const matchesPrice = isPriceInRange(turf.price, filters.Price);
    return matchesLocation && matchesSport && matchesPrice;
  });

  return (
    <div className="lg:mt-20 px-4 lg:mb-20">
      <h1 className="lg:ml-[250px] text-center text-2xl lg:text-3xl font-semibold mb-6">
        Available Turfs
      </h1>
      <div className=" lg:ml-[210px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTurfs.map((turf) => (
          <div
            key={turf._id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer overflow-hidden"
            onClick={() => handleCardClick(turf)}
          >
            <img
              src={turf.images}
              alt={`${turf.name} turf`}
              className="w-full h-40 lg:h-60 object-cover"
              onError={(e) => (e.target.src = "./images/placeholder.jpg")}
            />
            <div className="p-4 text-center">
              <p className="text-lg lg:text-xl font-bold capitalize">
                {turf.name}
              </p>
              <p className="text-gray-600 text-sm lg:text-base mt-1">
                <strong>Location:</strong> {turf.location || "N/A"}
              </p>
              <p className="text-gray-600 text-sm lg:text-base mt-1">
                <strong>Sport:</strong> {turf.sports_type || "N/A"}
              </p>
              <p className="text-gray-700 text-sm lg:text-base mt-2 font-semibold">
                <strong>Price:</strong> ₹{turf.price || "N/A"} per hour
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
