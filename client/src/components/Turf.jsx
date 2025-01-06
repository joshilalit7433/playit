import React, { useState, useEffect } from "react";
import axios from "axios";
import { TURF_API_END_POINT } from "../utils/constant.js";
import { useNavigate } from "react-router-dom";

export default function Turf({ filters }) {
  const [turfs, setTurfs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const response = await axios.get(`${TURF_API_END_POINT}/getTurf`);
        setTurfs(response.data.turfs);
      } catch (error) {
        console.error("Error fetching turfs:", error);
        if (error.response) {
          console.error("Response error:", error.response);
        }
      }
    };

    fetchTurfs();
  }, []);

  const handleCardClick = (turf) => {
    navigate(`/turfs/${turf._id}`, { state: { turf } });
  };

  // Filter turfs based on the filters
  const filteredTurfs = turfs.filter((turf) => {
    const matchesLocation =
      !filters.Location || turf.location === filters.Location;
    const matchesSport = !filters.Sports || turf.sports_type === filters.Sports;
    const matchesPrice =
      !filters.Price || turf.price === parseInt(filters.Price, 10); // Convert filters.Price to number
    return matchesLocation && matchesSport && matchesPrice;
  });

  return (
    <div>
      <h1 className="lg:ml-[250px] lg:text-[25px] lg:mt-4 lg:mb-4">Turfs</h1>
      <div className="ml-6  lg:ml-[220px] grid grid-cols-2 gap-4 sm:grid-cols-2 sm:justify-center lg:grid-rows-3 lg:grid-cols-3">
        {filteredTurfs.map((turf) => (
          <div
            key={turf._id}
            className="mt-2 mb-6 h-[250px] w-[160px] rounded-lg shadow-md shadow-black mr-2 lg:h-[380px] lg:w-[320px] lg:mr-10 cursor-pointer bg-white"
            onClick={() => handleCardClick(turf)}
          >
            <div className="flex justify-center mt-2 lg:mt-4">
              <img
                src={turf.images}
                alt={`${turf.name} turf img`}
                className="h-[100px] w-[150px] rounded-lg object-cover lg:h-[200px] lg:w-[300px]"
                onError={(e) => {
                  e.target.src = "./images/placeholder.jpg"; // Placeholder image
                }}
              />
            </div>
            <div className="pl-2 pt-1 lg:pl-4 lg:pt-2">
              <p className="text-[14px] lg:text-[20px] capitalize font-bold">
                {turf.name}
              </p>
              <p className="text-[12px] lg:text-[16px] text-gray-600 mt-1 lg:mt-2">
                <strong>Location:</strong> {turf.location || "N/A"}
              </p>
              <p className="text-[12px] lg:text-[16px] text-gray-600 mt-1 lg:mt-2">
                <strong>Sport:</strong> {turf.sports_type || "N/A"}
              </p>
              <p className="text-[12px] lg:text-[16px] text-gray-600 mt-1 lg:mt-2">
                <strong>Price:</strong> ₹{turf.price || "N/A"} per hour
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
