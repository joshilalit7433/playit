import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sports() {
  const navigate = useNavigate();

  const handleSportClick = (sport) => {
    navigate(`/sports/${sport}`);
  };

  const sports = [
    {
      name: "CRICKET",
      image: "./images/cricket.jpeg",
      path: "cricket",
    },
    {
      name: "BADMINTON",
      image: "./images/badminton.jpeg",
      path: "badminton",
    },
    {
      name: "FOOTBALL",
      image: "./images/football.jpeg",
      path: "football",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Sports List
          </h1>
          <p className="text-xl md:text-2xl text-gray-600">
            Come, Let's Play..
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {sports.map((sport) => (
            <div
              key={sport.name}
              onClick={() => handleSportClick(sport.path)}
              className="transform transition duration-300 hover:scale-105"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative">
                  <img
                    src={sport.image}
                    alt={sport.name.toLowerCase()}
                    className="w-full h-48 sm:h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 transition duration-300 hover:bg-opacity-10" />
                </div>
                <div className="p-4 text-center bg-gradient-to-r from-green-600 to-green-700">
                  <h3 className="text-xl font-bold text-white">{sport.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
