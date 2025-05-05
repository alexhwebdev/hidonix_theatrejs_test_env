import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import "./brandImageSlider.scss"; // Import SCSS module


// Import Images
// import limitlessApp1 from "../../public/home-imgs/limitless-app-1.png";
// import limitlessApp2 from "../../public/home-imgs/limitless-app-2.png";
// import limitlessApp3 from "../../public/home-imgs/limitless-app-3.png";
// import limitlessApp4 from "../../public/home-imgs/limitless-app-4.png";
// import limitlessApp5 from "../../public/home-imgs/limitless-app-5.png";
// import limitlessApp6 from "../../public/home-imgs/limitless-app-6.png";

// const images = [
//   limitlessApp1,
//   limitlessApp2,
//   limitlessApp3,
//   limitlessApp4,
//   limitlessApp5,
//   limitlessApp6,
// ];

interface BrandImageSliderProps {
  secTwoData: {
    images: {
      url: string;
      alt: string;      
    }[];
  }[];
}

// // Duplicate first 5 images at the end for smooth looping
// const extendedImages = [...images, ...images.slice(0, 5)];

const BrandImageSlider: React.FC<BrandImageSliderProps> = (
  { secTwoData }
) => {
  // Duplicate first 5 images at the end for smooth looping
  const extendedImages = [...secTwoData[0].images, ...secTwoData[0].images.slice(0, 5)];

  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [visibleSlides, setVisibleSlides] = useState(7);
  const imagesLength = secTwoData[0].images.length; // 6 original images

  const updateVisibleSlides = () => {
    const width = window.innerWidth;

    if (width >= 1200) {
      setVisibleSlides(7);
    } else if (width >= 912) {
      setVisibleSlides(5);
    } else if (width >= 568) {
      setVisibleSlides(3);
    } else {
      setVisibleSlides(1);
    }
  };
  // Run once on mount and add event listener for resizing
  useEffect(() => {
    updateVisibleSlides(); // Initial setup
    window.addEventListener("resize", updateVisibleSlides);

    return () => {
      window.removeEventListener("resize", updateVisibleSlides);
    };
  }, []);

  // Memoized function to move to the next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => prevIndex + 1);

    if (sliderRef.current) {
      sliderRef.current.style.transition = "transform 0.5s ease-in-out";
      sliderRef.current.style.transform = `translateX(-${(currentIndex + 1) * (100 / visibleSlides)}%)`;
    }
  }, [currentIndex, visibleSlides]);

  // Memoized function to move to the previous slide
  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imagesLength - 1 : prevIndex - 1
    );

    if (sliderRef.current) {
      sliderRef.current.style.transition = "transform 0.5s ease-in-out";
      sliderRef.current.style.transform = `translateX(-${(currentIndex - 1) * (100 / visibleSlides)}%)`;
    }
  }, [currentIndex, imagesLength, visibleSlides]);

  
  // // Auto-slide every 3 seconds
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     nextSlide();
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [nextSlide]);


  // Reset animation when reaching the cloned images
  useEffect(() => {
    if (currentIndex === imagesLength) {
      setTimeout(() => {
        if (sliderRef.current) {
          sliderRef.current.style.transition = "none";
          sliderRef.current.style.transform = `translateX(0%)`;
        }
        setCurrentIndex(0);
      }, 500);
    }
  }, [currentIndex, imagesLength]);

  return (
    <div className={`gallery__container`}>
      <div
        className={`slider`}
        ref={sliderRef}
        style={{ transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)` }}
      >
        {extendedImages.map((image, index) => (
          <div key={index} className={`slide`}>
            <Image
              className={`image`}
              src={image.url}
              alt={`Slide ${index}`}
              width={200}
              height={200}
            />
          </div>
        ))}
      </div>
      <button className={`prev`} onClick={prevSlide}>❮</button>
      <button className={`next`} onClick={nextSlide}>❯</button>
    </div>
  );
};

export default BrandImageSlider;
