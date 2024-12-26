import React from "react";
import { useLocation } from "react-router-dom";

const SingleTurfDetail = () => {
  const location = useLocation();
  const turf = location.state?.turf;

  if (!turf) {
    return <p>Loading turf details...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 shadow-lg border rounded-lg mb-6">
      <h1 className="text-3xl font-bold mb-4">{turf.name}</h1>
      <img
        src={turf.images}
        alt={turf.name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <p className="text-lg text-gray-700 mb-2">
        <strong>Location:</strong> {turf.location}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <strong>Price:</strong> ₹{turf.price}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <strong>Ratings:</strong> {turf.ratings} / 5
      </p>
      <p className="text-lg text-gray-700 mb-4">
        <strong>Description:</strong> {turf.description}
      </p>
      <div className="flex justify-center mt-6">
        <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default SingleTurfDetail;
