import React from "react";

const SingleTurfDetail = () => {
  // Dummy turf data
  const turf = {
    name: "Greenfield Turf",
    location: "Mumbai, India",
    description: "A well-maintained turf suitable for football and cricket.",
    images:
      "https://cpimg.tistatic.com/08526634/b/4/Artificial-Synthetic-Football-Field-Turf.jpg", // Placeholder image
    price: "1500",
    ratings: 4.5,
    duration: "1 hour",
    sports: [
      { id: 1, name: "Box Cricket", icon: "🏏" },
      { id: 2, name: "Football", icon: "⚽" },
    ],
  };

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
      <p className="text-lg text-gray-700 mb-2 flex items-center gap-2">
        <span>
          <strong>Duration:</strong> {turf.duration}
        </span>
        <span className="text-xl">⏰</span>
      </p>
      <p className="text-lg text-gray-700 mb-4">
        <strong>Description:</strong> {turf.description}
      </p>
      {/* Available Sports Section */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">Available Sports</h2>
        <div className="flex gap-4">
          {turf.sports.map((sport) => (
            <button
              key={sport.id}
              className="flex items-center gap-2 border px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              <span className="text-lg">{sport.icon}</span>
              {sport.name}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default SingleTurfDetail;
