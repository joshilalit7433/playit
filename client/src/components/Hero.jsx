import React, { useState, useEffect, useCallback } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

export default function Hero() {
  const slides = [
    { url: "./images/slide_1.jpg" },
    { url: "./images/slide_2.jpg" },
    { url: "./images/slide_3.jpg" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides.length]);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const swipeDistance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (swipeDistance > minSwipeDistance) {
      nextSlide();
    }

    if (swipeDistance < -minSwipeDistance) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div
      className="relative group mx-auto max-w-[90%] lg:max-w-[80%] pt-8 mt-16"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide */}
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-0 pb-[56.25%] lg:pb-[56.25%] relative bg-center bg-cover rounded-xl duration-500"
      ></div>
      {/* Left Arrow */}
      <div
        className="hidden group-hover:block hidden-mobile absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-xl md:text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
        onClick={prevSlide}
      >
        <BsChevronCompactLeft size={30} />
      </div>
      {/* Right Arrow */}
      <div
        className="hidden group-hover:block hidden-mobile absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-xl md:text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
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
