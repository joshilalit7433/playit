import React from "react";

export default function Sports() {
  return (
    <>
      <div className="mt-[20px] mb-[20px]">
        <div className="mb-[15px]">
          <p className=" text-3xl flex justify-center lg:text-4xl lg:flex lg:justify-center">
            {" "}
            Sports List
          </p>
          <p className=" text-xl flex justify-center lg:text-2xl lg:flex lg:justify-center">
            {" "}
            Come, Lets Play..
          </p>
        </div>

        <div className=" grid grid-rows-2 grid-cols-2 pl-[20px] lg:grid lg:grid-rows-1 lg:grid-cols-3 lg:pl-[200px]">
          <div className="lg:mb-[20px] ">
            <img
              src="./images/cricket.jpg"
              className=" h-[200px] w-[150px] lg:h-[350px] lg:w-[250px] rounded-3xl"
            ></img>
            <p className=" text-xl ml-[40px] lg:text-[25px] lg:ml-[70px]">
              CRICKET
            </p>
          </div>

          <div className="lg:mb-[20px] ">
            <img
              src="./images/badminton.jpg"
              className="h-[200px] w-[150px] lg:h-[350px] lg:w-[250px] rounded-3xl"
            ></img>
            <p className=" text-xl ml-[20px] lg:text-[25px] lg:ml-[50px]">
              BADMINTON
            </p>
          </div>

          <div className="lg:mb-[20px] ">
            <img
              src="./images/football.jpg"
              className=" h-[200px] w-[150px] lg:h-[350px] lg:w-[250px] rounded-3xl"
            ></img>
            <p className=" text-xl ml-[30px] lg:text-[25px] lg:ml-[60px]">
              FOOTBALL
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
