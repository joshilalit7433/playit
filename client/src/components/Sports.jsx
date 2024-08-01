import React from "react";

export default function Sports() {
  return (
    <>
      <div>
        <div>
          <p className="lg:text-4xl lg:flex lg:justify-center"> Sports List</p>
          <p className="lg:text-2xl lg:flex lg:justify-center">
            {" "}
            Come, Lets Play..
          </p>
        </div>

        <div className="lg:grid lg:grid-rows-2 grid-cols-3">
          <div className="lg:mb-[20px] lg:ml-[80px]">
            <img
              src="./images/3.jpeg"
              alt="3"
              className="lg:h-[350px] lg:w-[250px] rounded-3xl"
            ></img>
          </div>

          <div className="lg:mb-[20px] lg:ml-[80px]">
            <img
              src="./images/1.jpeg"
              alt="1"
              className="lg:h-[350px] lg:w-[250px] rounded-3xl"
            ></img>
          </div>

          <div className="lg:mb-[20px] lg:ml-[80px]">
            <img
              src="./images/2.jpeg"
              alt="2"
              className="lg:h-[350px] lg:w-[250px] rounded-3xl"
            ></img>
          </div>

          <div className="lg:mb-[20px] lg:ml-[250px]">
            <img
              src="./images/1.jpeg"
              alt="1"
              className="lg:h-[350px] lg:w-[250px] rounded-3xl"
            ></img>
          </div>

          <div className="lg:mb-[20px] lg:ml-[250px]">
            <img
              src="./images/3.jpeg"
              alt="3"
              className="lg:h-[350px] lg:w-[250px] rounded-3xl"
            ></img>
          </div>
        </div>
      </div>
    </>
  );
}
