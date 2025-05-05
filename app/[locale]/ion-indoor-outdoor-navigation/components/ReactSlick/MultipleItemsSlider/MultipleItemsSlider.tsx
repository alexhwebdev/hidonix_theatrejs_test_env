"use client";
// https://react-slick.neostack.com/docs/example/multiple-items
import Slider from "react-slick";
import Image from "next/image";
import "./multiple-items-slider.scss";


interface IMultipleItemsSliderProps {
  globalAsset: {
    alt: string;
    url: string;
  }[];
  ionS7Gallery: {
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
  { ionS7Gallery, globalAsset }
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
          width={100}
          height={100}
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
          width={100}
          height={100}
        />
    );
  };

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 5,
    speed: 500,
    nextArrow: <CustomNextArrow className="" style={{}} onClick={() => {}} />,
    prevArrow: <CustomPrevArrow className="" style={{}} onClick={() => {}} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerPadding: "0px",
          slidesToShow: 3,
          slidesToScroll: 1,
          // infinite: true,
          // dots: true
        }
      },
      {
        breakpoint: 430,
        settings: {
          centerPadding: "0px",
          slidesToShow: 1,
          slidesToScroll: 1,
          // infinite: true,
          // dots: true
        }
      }
    ]
  };

  return (
    <div className="rs__multi_items_slider ion__section7_slider">
      <Slider {...settings}>
        {ionS7Gallery.map((img, index) => (
          <div key={`ion-s7-img-` + index}>
            <Image 
              src={img.url} 
              alt={img.alt} 
              width={350}
              height={400}
              quality={100}
            />
            <p>{img.alt}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default MultipleItemsSlider;
