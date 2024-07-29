import React, { useState } from 'react'
import { useEffect } from 'react';

export default function Hero() {
    
    let[image,setimage]=useState(0)

    const images=[
        "./images/1.jpeg",
        "./images/2.jpeg",
        "./images/3.jpeg",
    ]

   
    
     

    const nextimg=()=>{
        setimage(image===images.length-1 ? 0 : image+1)
    }

    const previmg=()=>{
        setimage(image===0 ? images.length-1 :image-1)
    }

    useEffect(()=>{
        
    const slideclear= setInterval(()=>{
            nextimg()
        },3000)

        return()=>clearInterval(slideclear)
    },[image])

   

  return (
   <>
  

   <div className=' mt-[20px] flex justify-center lg:flex lg:justify-center ' >

    <div className=' z-0 lg:z-0  mt-[90px] mr-[-40px]   lg:mr-[-60px] lg:mt-[200px]'>
   <button className='border-4 lg:border-8 border-white text-white h-[50px] w-[40px] lg:h-[200px] lg:w-[60px] lg:text-[40px]' onClick={previmg}>&#10094;</button>
   </div>

  <img src={images[image]} className=' h-[200px] w-screen lg:h-[600px] lg:w-screen '></img>

  


    <div className=' z-0 lg:z-0  mt-[90px] ml-[-40px] lg:ml-[-60px] lg:mt-[200px]'>
   <button className='border-4 lg:border-8 border-white text-white h-[50px] w-[40px] lg:h-[200px] lg:w-[60px] lg:text-[40px]' onClick={nextimg}>&#10095;</button>
   </div>

   

   </div>
   </>
  )
}
