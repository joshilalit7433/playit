import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SportsListFilter from "../components/SportsListFilter.jsx";
import { TURF_API_END_POINT } from "../utils/constant.js";

const CricketTurfPage = () => {
  const { sport } = useParams(); // sport will be "cricket" based on the routing setup
  const [turfs, setTurfs] = useState([]);
  const [filters, setFilters] = useState({
    Location: "",
    Sports: sport,
    Price: "",
  });
  const navigate = useNavigate();

  // Function to normalize location (strip "East", "West", etc.)
  const normalizeLocation = (location) => {
    return location.split(" ")[0].toLowerCase(); // Extract base location
  };

  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const response = await axios.get(`${TURF_API_END_POINT}/getTurf`);
        // Filter only cricket turfs from the API response
        const approvedTurfs = response.data.turfs.filter(
          (turf) =>
            turf.state === true &&
            turf.sports_type &&
            turf.sports_type.toLowerCase() === "cricket"
        );
        setTurfs(approvedTurfs);
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

  // Function to check if the turf price falls within the selected range
  const isPriceInRange = (price, range) => {
    if (!range) return true; // No filter applied
    const [min, max] = range.split("-").map(Number); // Split range into min and max values
    return price >= min && price <= max;
  };

  const filteredTurfs = turfs.filter((turf) => {
    const matchesLocation =
      !filters.Location ||
      normalizeLocation(turf.location) === normalizeLocation(filters.Location);
    const matchesPrice = isPriceInRange(turf.price, filters.Price); // Check if price is in the selected range
    return matchesLocation && matchesPrice; // Sports filter is redundant since the turfs are already filtered for cricket
  });

  return (
    <div className="lg:flex lg:flex-row mt-[70px]">
      {/* Filter Component */}
      <div className="lg:w-[200px]">
        <SportsListFilter onFilterChange={handleFilterChange} />
      </div>

      {/* Turfs Display */}
      <div className="lg:w-3/4 p-4">
        <h1 className="text-center text-[20px] lg:text-[25px] font-bold lg:mt-4 lg:mb-4 capitalize">
          Cricket Turfs
        </h1>
        <div className="grid grid-cols-2 gap-4 lg:gap-x-[200px] lg:grid-cols-3 lg:justify-start">
          {filteredTurfs.map((turf) => (
            <div
              key={turf._id}
              className="mt-2 mb-6 h-[250px] w-[160px] rounded-lg shadow-md shadow-black lg:h-[380px] lg:w-[320px] cursor-pointer bg-white"
              onClick={() => handleTurfClick(turf)}
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
              <div className="pl-2 pt-1 lg:pl-4 lg:pt-2 text-center">
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
    </div>
  );
};

export default CricketTurfPage;
