"use client";
// https://react-slick.neostack.com/docs/example/custom-paging
import React from "react";
import Image from 'next/image';
import Slider from "react-slick";
// import { baseUrl } from "./projects";
import { IGlobalAssetsProps } from "@/types/pageContent.types";


interface ICustomPaging {
  narrowArrows: IGlobalAssetsProps[];
  gallery: {
    alt: string;
    url: string;
  }[];
}

interface IArrowProps {
  className: string;
  style: React.CSSProperties;
  onClick: () => void;
}

const CustomPaging = (
  { 
    narrowArrows,
    gallery 
  }: ICustomPaging
) => {
  let rightArrow: { url: string; alt: string }; 
  let leftArrow: { url: string; alt: string }; 
  narrowArrows.map((arrow) => {
    if ( arrow.alt.includes("Right") ) {
      rightArrow = arrow
    } else {
      leftArrow = arrow
    }
  })

  const CustomPrevArrow = ( props: IArrowProps ) => {
    const { className, style, onClick } = props;
    if (!leftArrow) return null; // Prevent rendering if arrow is missing
    return (
        <Image
          src={leftArrow.url}
          alt="Previous"
          className={className || ""}
          style={{ ...style, left: "10px", zIndex: 10, width: "40px", height: "40px" }}
          onClick={onClick}
          width={25}
          height={25}
        />
    );
  };
  
  const CustomNextArrow = ( props: IArrowProps ) => {
    const { className, style, onClick } = props;
    if (!rightArrow) return null; // Prevent rendering if arrow is missing
    return (
        <Image
          src={rightArrow.url}
          alt="Next"
          className={className || ""}
          style={{ ...style, right: "10px", zIndex: 10, width: "40px", height: "40px" }}
          onClick={onClick}
          width={25}
          height={25}
        />
    );
  };

  const settings = {
    customPaging: function(i: number) {
      return (
        <div>
          <Image 
            src={gallery[i].url} 
            alt={gallery[i].alt} 
            width={50}
            height={50}
          />
        </div>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow className="" style={{}} onClick={() => {}} />,
    prevArrow: <CustomPrevArrow className="" style={{}} onClick={() => {}} />,
  };

  return (
    <div className="slider-container">
      {gallery && gallery.length > 0 ? (
        <Slider {...settings}>
          {gallery.map((img, index) => (
            <div key={`project-${index}`}>
              <Image 
                src={img.url} 
                alt={img.alt} 
                width={500}
                height={600}
              />                 
            </div>
          ))}
        </Slider>
      ) : (
        <p>Loading images...</p>
      )}
    </div>
  );
}


export default CustomPaging;