import React, { useState } from "react";
import { useEffect } from "react";

export default function Hero() {
  // let[image,setimage]=useState(0)

  // const images=[
  //     "./images/1.jpeg",
  //     "./images/2.jpeg",
  //     "./images/3.jpeg",
  // ]

  // const nextimg=()=>{
  //     setimage(image===images.length-1 ? 0 : image+1)
  // }

  // const previmg=()=>{
  //     setimage(image===0 ? images.length-1 :image-1)
  // }

  // useEffect(()=>{

  // const slideclear= setInterval(()=>{
  //         nextimg()
  //     },3000)

  //     return()=>clearInterval(slideclear)
  // },[image])

  return (
    <>
      <div className=" mt-[0px] lg:mt-0 flex justify-center lg:flex lg:justify-center ">
        <div className="  z-0 lg:z-0  mt-[120px] mr-[-280px]  lg:mr-[-1000px]   lg:mt-[400px]">
          <p className=" text-[20px] lg:text-4xl text-white pl-[40px] lg:pl-[560px]   ">
            Real Slot Booking Platform
          </p>
          <p className="text-[20px] lg:text-4xl text-white pl-[40px] lg:pl-[560px] ">
            We Make Venue Booking
          </p>
          <p className="text-[20px] lg:text-4xl text-white pl-[40px] lg:pl-[560px] ">
            Simple
          </p>
        </div>

        <img
          src="./images/2.jpeg"
          className=" h-[220px] w-screen lg:h-[600px] lg:w-screen "
        ></img>
      </div>
    </>
  );
}
