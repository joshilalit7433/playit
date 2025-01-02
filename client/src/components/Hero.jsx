import React, { useState } from "react";
import { useEffect } from "react";

export default function Hero() {
  return (
    <>
      <div className="relative flex justify-center items-center">
        {/* Text Section */}
        <div className="absolute z-10 text-center lg:text-left">
          <p className="text-[16px] sm:text-[20px] lg:text-4xl text-white font-semibold px-4 lg:px-16">
            Real Slot Booking Platform
          </p>
          <p className="text-[16px] sm:text-[20px] lg:text-4xl text-white font-semibold px-4 lg:px-16">
            We Make Venue Booking
          </p>
          <p className="text-[16px] sm:text-[20px] lg:text-4xl text-white font-semibold px-4 lg:px-16">
            Simple
          </p>
        </div>

        {/* Background Image */}
        <img
          src="./images/2.jpeg"
          alt="Hero Background"
          className="h-[220px] w-full object-cover lg:h-[600px]"
        />
      </div>
    </>
  );
}
