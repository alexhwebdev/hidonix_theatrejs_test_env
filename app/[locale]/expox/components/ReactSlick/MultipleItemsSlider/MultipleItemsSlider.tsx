"use client";
// https://react-slick.neostack.com/docs/example/multiple-items
import Slider from "react-slick";
import Image from "next/image";
import parse from 'html-react-parser';
import "./multiple-items-slider.scss";


interface IMultipleItemsSliderProps {
  mitS4SubheadingBody: {
    subheading: string;
    body: string;
  }[];
  globalAsset: {
    alt: string;
    url: string;
  }[];
}
interface IArrowProps {
  className: string;
  style: React.CSSProperties;
  onClick: () => void;
}

const MultipleItemsSlider: React.FC<IMultipleItemsSliderProps> = (
  { mitS4SubheadingBody, globalAsset }
) => {
  let rightArrow: { url: string; alt: string }; 
  let leftArrow: { url: string; alt: string }; 

  const arrows = globalAsset.filter( arrows => {
    return arrows.alt.includes("Arrow Nav White");
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
          width={50}
          height={50}
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
          width={50}
          height={50}
        />
    );
  };

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    nextArrow: <CustomNextArrow className="" style={{}} onClick={() => {}} />,
    prevArrow: <CustomPrevArrow className="" style={{}} onClick={() => {}} />,
    responsive: [
      {
        breakpoint: 912,
        settings: {
          centerPadding: "0px",
          slidesToShow: 2,
          slidesToScroll: 1,
          // infinite: true,
          // dots: true
        }
      },
      {
        breakpoint: 700,
        settings: {
          centerPadding: "50px",
          slidesToShow: 2,
          slidesToScroll: 1,
          // infinite: true,
          // dots: true
        }
      },
      {
        breakpoint: 568,
        settings: {
          centerPadding: "50px",
          slidesToShow: 1,
          slidesToScroll: 1,
          // infinite: true,
          // dots: true
        }
      }
    ]
  };

  return (
    <div className={`rs__multi_items_slider advantages_slider`}>
      <Slider {...settings}>
        {mitS4SubheadingBody.map((copy, index) => (
          <div key={index} className={`slide`}>
            {parse(copy.subheading)}
            {parse(copy.body)}
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default MultipleItemsSlider;
