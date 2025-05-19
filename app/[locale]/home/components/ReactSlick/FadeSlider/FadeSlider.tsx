"use client";
import Image from "next/image";
import Slider from "react-slick"; 
import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
import "./fade-slider.scss";
import { useEffect } from "react";
import { usePathname } from 'next/navigation';

interface IFadeSliderProps {
  secOneData: {
    heading: string;
    body: string;
    button: string;
    image: {
      url: string;
      alt: string;
    };
    link: string;
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

const FadeSlider: React.FC<IFadeSliderProps> = (
  { secOneData, homeGlobalAssets }
) => {
  useEffect(() => {
    const tl = gsap.timeline();
  
    tl.fromTo(
      ".home__hero_image_copy h1", 
      { opacity: 0, top: "75px" },
      { 
        delay: 0,
        opacity: 1, 
        top: "0px", 
        ease: "power1.out", 
        duration: 1,
      })
      .fromTo(
        ".home__hero_image_copy p", 
        { opacity: 0, top: "75px" },
        { 
          opacity: 1, 
          top: "0px", 
          ease: "power1.out", 
          duration: 1,
        }, "-=0.8")
      .fromTo(
        ".home__hero_image_copy button", 
        { opacity: 0, top: "75px" },
        { 
          opacity: 1, 
          top: "0px", 
          ease: "power1.out", 
          duration: 1,
        }, "-=0.6");
  }, []);

  const pathname = usePathname();
  const locale = pathname.substring(1, 3);
  
  let rightArrow: { url: string; alt: string };
  let leftArrow: { url: string; alt: string };
  const arrows = homeGlobalAssets.filter((arrows) => {
    return arrows.alt.includes("Arrow Nav White");
  });

  arrows.map((arrow) => {
    if (arrow.alt.includes("Right")) {
      rightArrow = arrow;
    } else {
      leftArrow = arrow;
    }
  });

  const CustomPrevArrow = (props: IArrowProps) => {
    const { className, style, onClick } = props;
    if (!leftArrow) return null; // Prevent rendering if arrow is missing
    return (
      <Image
        src={leftArrow.url}
        alt={`Previous`}
        className={className || ""}
        style={{ ...style, left: "10px", zIndex: 10, width: "40px", height: "40px" }}
        onClick={onClick}
        width={25}
        height={25}
        priority
      />
    );
  };

  const CustomNextArrow = (props: IArrowProps) => {
    const { className, style, onClick } = props;
    if (!rightArrow) return null; // Prevent rendering if arrow is missing
    return (
      <Image
        src={rightArrow.url}
        alt={`Next`}
        className={className || ""}
        style={{ ...style, right: "10px", zIndex: 10, width: "40px", height: "40px" }}
        onClick={onClick}
        width={25}
        height={25}
        priority
      />
    );
  };

  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    adaptiveHeight: true,
    nextArrow: <CustomNextArrow className="" style={{}} onClick={() => {}} />,
    prevArrow: <CustomPrevArrow className="" style={{}} onClick={() => {}} />,
  };

  return (
    <div id={`rs__fade_slider`}>
      <Slider {...settings}>
        {secOneData.map((item, index) => (
          <div key={`home-hero-${index}`} className={`slide`}>
            <div className={`home__hero_image_copy`}>
              <h1>{item.heading}</h1>
              <p>{item.body}</p>
              <button aria-hidden="true" disabled tabIndex={-1}>
                <a href={`${locale}${item.link}`}>
                  {item.button}
                </a>
              </button>

            </div>
            <Image
              className={`home__hero_image`}
              src={item.image.url}
              alt={item.image.alt}
              fill={true}
              priority
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FadeSlider;
