import React from "react";
import axios from 'axios';
import { useState,useEffect } from "react";
import { TURF_API_END_POINT } from "../utils/constant.js";


export default function Turf() {

  const [turfs, setTurfs] = useState([]);

  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const response = await axios.get(`${TURF_API_END_POINT}/getTurf`); 
        setTurfs(response.data.turfs); 
      } catch (error) {
        console.error('Error fetching turfs:', error);
      }
    };

    fetchTurfs();
  }, []);



  return (
    <>
      <div>
  <h1 className="lg:ml-[250px] lg:text-[25px] lg:mt-4 lg:mb-4">Turfs</h1>
  <div className="lg:grid lg:grid-rows-3 lg:grid-cols-3 lg:ml-[220px]">
    {turfs.map((turf) => (
      <div
        key={turf._id}
        className="mt-2 mb-10 h-[330px] w-[290px] rounded-lg lg:h-[380px] lg:w-[320px] shadow-lg shadow-black mr-4 lg:mr-10"
      >
        <div className="flex justify-center mt-4 lg:flex lg:justify-center lg:mt-4">
          <img
            src={turf.images} // Assuming the first image string is used
            alt={turf.name + ' turf image'}
            className="h-[180px] w-[280px] rounded-lg lg:h-[200px] lg:w-[300px] lg:rounded-lg"
            onError={(e) => {
              e.target.src = './images/placeholder.jpg'; // Handle missing or invalid image
            }}
          />
        </div>

        <div className="pl-4 pt-2 lg:pl-4 lg:pt-2">
          <p className="text-[20px] capitalize lg:text-[20px] font-bold">
            {turf.name}
          </p>
        </div>

        <div className="pl-4 pt-2 grid grid-cols-2 lg:pl-4 lg:pt-2 lg:grid lg:grid-cols-2">
          <div>
            <p className="text-[20px] capitalize lg:text-[20px]">
              {turf.location}
            </p>
          </div>

          <div className="pr-4 lg:pr-4">
            <p className="text-[20px] float-right lg:mb-6 capitalize lg:text-[20px] lg:float-right">
              ₹ {turf.price}
            </p>
          </div>
        </div>

        <div className="pl-4 lg:pl-4">
          <p className="text-[20px] capitalize lg:text-[20px]">
            Ratings: {turf.ratings}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>
    </>
  );
}
