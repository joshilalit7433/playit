import React from "react";

export default function Turf() {
  return (
    <>
      <div className=" mt-2  mb-10 h-[330px] w-[290px] rounded-lg  lg:h-[380px] lg:w-[320px] lg:ml-[100px] l shadow-lg shadow-black lg:mt-2 lg:mb-10 ">
        <div className=" flex justify-center mt-4 lg:flex lg:justify-center lg:mt-4">
          <img
            src="./images/football.jpeg"
            alt="turf image"
            className=" h-[180px] w-[280px] rounded-lg lg:h-[200px] lg:w-[300px] lg:rounded-lg "
          ></img>
        </div>

        <div className=" pl-4 pt-2 lg:pl-4 lg:pt-2">
          <p className=" text-[20px] capitalize lg:text-[20px] font-bold">
            club de amigos
          </p>
        </div>

        <div className=" pl-4 pt-2 grid grid-cols-2 lg:pl-4 lg:pt-2 lg:grid lg:grid-cols-2">
          <div>
            <p className=" text-[20px] capitalize lg:text-[20px]">mumbai</p>
          </div>

          <div className=" pr-4 lg:pr-4">
            <p className=" text-[20px] float-right lg:mb-6 capitalize lg:text-[20px] lg:float-right">
              rs 600
            </p>
          </div>
        </div>

        <div className="pl-4 lg:pl-4">
          <p className="text-[20px] capitalize lg:text-[20px]">ratings</p>
        </div>
      </div>
    </>
  );
}
