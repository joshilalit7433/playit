import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FilterTurfs from "./FilterTurfs";
import { TURF_API_END_POINT } from "../utils/constant.js";
import { useNavigate } from "react-router-dom";

const SportsTurfPage = () => {
  const { sport } = useParams(); // Get the sport type from the route params
  const [turfs, setTurfs] = useState([]);
  const [filters, setFilters] = useState({
    Location: "",
    Sports: sport,
    Price: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const response = await axios.get(`${TURF_API_END_POINT}/getTurf`);
        // Filter turfs with state=true before setting state
        const approvedTurfs = response.data.turfs.filter(
          (turf) => turf.state === true
        );
        setTurfs(approvedTurfs);
      } catch (error) {
        console.error("Error fetching turfs:", error);
        if (error.response) {
          console.error("Response error:", error.response);
        }
      }
    };

    fetchTurfs();
  }, []);

  const handleFilterChange = (updatedFilters) => {
    setFilters({ ...updatedFilters, Sports: sport }); // Ensure the sport filter remains consistent
  };

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
    <div className="lg:flex lg:flex-row">
      {/* Filter Component */}
      <div className="lg:w-[200px]">
        <FilterTurfs onFilterChange={handleFilterChange} />
      </div>

      {/* Turfs Display */}
      <div className="lg:flex-1 lg:ml-[200px]">
        <h1 className="text-center lg:text-[25px] lg:mt-4 lg:mb-4 capitalize">
          {sport} Turfs
        </h1>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6 p-4">
          {filteredTurfs.map((turf) => (
            <div
              key={turf._id}
              className="mt-2 mb-10 h-[380px] w-[320px] rounded-lg shadow-lg shadow-black mr-4 lg:mr-10 cursor-pointer bg-white"
              onClick={() => handleCardClick(turf)}
            >
              <div className="flex justify-center mt-4">
                <img
                  src={turf.images}
                  alt={`${turf.name} turf img`}
                  className="h-[200px] w-[300px] rounded-lg object-cover"
                  onError={(e) => {
                    e.target.src = "./images/placeholder.jpg"; // Placeholder image
                  }}
                />
              </div>
              <div className="pl-4 pt-2">
                <p className="text-[20px] capitalize font-bold">{turf.name}</p>
                <p className="text-[16px] text-gray-600 mt-2">
                  <strong>Location:</strong> {turf.location || "N/A"}
                </p>
                <p className="text-[16px] text-gray-600 mt-2">
                  <strong>Sport:</strong> {turf.sports_type || "N/A"}
                </p>
                <p className="text-[16px] text-gray-600 mt-2">
                  <strong>Price:</strong> ₹{turf.price || "N/A"} per hour
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SportsTurfPage;
