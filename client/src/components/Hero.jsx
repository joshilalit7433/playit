import React, { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

export default function Hero() {
  const slides = [
    { url: "./images/slide_1.png" },
    { url: "./images/slide_2.png" },
    { url: "./images/slide_3.png" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // Automatic Sliding
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer); // Cleanup on unmount
  }, [currentIndex]);

  return (
    <div className="w-full h-[500px] md:h-[600px] lg:h-[780px] max-w-[90%] lg:max-w-[80%] mx-auto py-8 px-4 relative group">
      {/* Slide */}
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full rounded-xl bg-center bg-cover duration-500"
      ></div>
      {/* Left Arrow */}
      <div
        className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-xl md:text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
        onClick={prevSlide}
      >
        <BsChevronCompactLeft size={30} />
      </div>
      {/* Right Arrow */}
      <div
        className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-xl md:text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
        onClick={nextSlide}
      >
        <BsChevronCompactRight size={30} />
      </div>
      {/* Dots */}
      <div className="flex justify-center py-4">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`text-xl md:text-2xl cursor-pointer mx-1 ${
              slideIndex === currentIndex
                ? "text-green-700 scale-125"
                : "text-gray-400"
            } transition-transform duration-300 hover:text-green-700 hover:scale-125`}
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}
