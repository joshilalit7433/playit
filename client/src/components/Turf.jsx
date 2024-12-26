import React, { useState, useEffect } from "react";
import axios from "axios";
import { TURF_API_END_POINT } from "../utils/constant.js";
import { useNavigate } from "react-router-dom";

export default function Turf() {
  const [turfs, setTurfs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const response = await axios.get(`${TURF_API_END_POINT}/getTurf`);
        setTurfs(response.data.turfs);
      } catch (error) {
        console.error("Error fetching turfs:", error);
      }
    };

    fetchTurfs();
  }, []);

  const handleCardClick = (turf) => {
    navigate(`/turfs/${turf._id}`, { state: { turf } });
  };

  return (
    <div>
      <h1 className="lg:ml-[250px] lg:text-[25px] lg:mt-4 lg:mb-4">Turfs</h1>
      <div className="lg:grid lg:grid-rows-3 lg:grid-cols-3 lg:ml-[220px] gap-6">
        {turfs.map((turf) => (
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
                <strong>Rating:</strong>{" "}
                {turf.ratings ? `${turf.ratings} / 5` : "N/A"}
              </p>
              <p className="text-[16px] text-gray-600 mt-2">
                <strong>Price:</strong> ₹{turf.price || "N/A"} per hour
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
