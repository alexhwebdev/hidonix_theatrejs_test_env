"use client";
// https://react-slick.neostack.com/docs/example/multiple-items
import Slider from "react-slick";
import Image from "next/image";
import "./center-mode-slider.scss";


interface ICenterModeSliderProps {
  secTwoData: {
    images: {
      url: string;
      alt: string;      
    }[];
  }[];
  homeGlobalAssets: {
    alt: string;
    url: string;
  }[];
}
interface IArrowProps {
  className: string;
  style: React.CSSProperties;
  onClick: () => void;
}

const CenterModeSlider: React.FC<ICenterModeSliderProps> = (
  { secTwoData, homeGlobalAssets }
) => {
  let rightArrow: { url: string; alt: string }; 
  let leftArrow: { url: string; alt: string }; 

  const arrows = homeGlobalAssets.filter( arrows => {
    return arrows.alt.includes("Arrow Nav Black");
  })
  arrows.map((arrow) => {
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
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 5,
    speed: 500,
    nextArrow: <CustomNextArrow className="" style={{}} onClick={() => {}} />,
    prevArrow: <CustomPrevArrow className="" style={{}} onClick={() => {}} />,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          centerPadding: "0px",
          slidesToShow: 3,
          slidesToScroll: 1,
          // infinite: true,
          // dots: true
        }
      }
    ]
  };

  return (
    <div className="rs__center_mode_slider">
      <Slider {...settings}>
        {secTwoData[0].images.map((image, index) => (
          <div key={index} className={`slide`}>
            <Image
              className={`image`}
              src={image.url}
              alt={image.alt}
              width={200}
              height={200}
              quality={75}
              // fill
              // sizes="(max-width: 768px) 120px, 200px"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CenterModeSlider;
