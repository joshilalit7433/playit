import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import FilterTurfs from "../components/FilterTurfs.jsx";
import { TURF_API_END_POINT } from "../utils/constant.js";

const CricketTurfPage = () => {
  const { sport } = useParams(); // sport will be "cricket" based on the routing setup
  const [turfs, setTurfs] = useState([]);
  const [filters, setFilters] = useState({ Location: "", Sports: sport, Price: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const response = await axios.get(`${TURF_API_END_POINT}/getTurf`);
        // Filter only cricket turfs from the API response
        const cricketTurfs = response.data.turfs.filter((turf) => turf.sports_type.toLowerCase() === "cricket");
        setTurfs(cricketTurfs);
      } catch (error) {
        console.error("Error fetching turfs:", error);
      }
    };

    fetchTurfs();
  }, []);

  const handleFilterChange = (updatedFilters) => {
    setFilters({ ...updatedFilters, Sports: sport });
  };

  const handleTurfClick = (turf) => {
    navigate(`/turfs/${turf._id}`, { state: { turf } });
  };

  const filteredTurfs = turfs.filter((turf) => {
    const matchesLocation = !filters.Location || turf.location === filters.Location;
    const matchesPrice = !filters.Price || turf.price === parseInt(filters.Price, 10);
    return matchesLocation && matchesPrice; // Sports filter is redundant since the turfs are already filtered for cricket
  });

  return (
    <div className="lg:flex lg:flex-row">
      {/* Filter Component */}
      <div className="lg:w-1/4">
        <FilterTurfs onFilterChange={handleFilterChange} />
      </div>

      {/* Turfs Display */}
      <div className="lg:w-3/4">
        <h1 className="lg:text-[25px] lg:mt-4 lg:mb-4 capitalize">Cricket Turfs</h1>
        <div className="flex flex-wrap justify-start gap-4">
          {filteredTurfs.map((turf) => (
            <div
              key={turf._id}
              className="mt-2 mb-10 h-[380px] w-[320px] rounded-lg shadow-lg shadow-black bg-white cursor-pointer"
              onClick={() => handleTurfClick(turf)}
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

export default CricketTurfPage;
