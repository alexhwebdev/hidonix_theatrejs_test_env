import React from 'react'

const HeroImageSlider = () => {
  return (
    <div>HeroImageSlider</div>
  )
}

export default HeroImageSlider

// import { useState, useEffect } from "react";
// import styles from "./heroImageSlider.module.scss"; // Import CSS Module
// import Image from "next/image";
// import limitlessApp1 from "../../public/home-imgs/mit.png";
// // import limitlessApp2 from "../../public/home-imgs/ion.png";

// // const images = [limitlessApp1, limitlessApp2];

// interface HeroImageSliderProps {
//   secOneData: {
//     heading: string;
//     body: string;
//     button: string;
//     image: { url: string };
//     link: string;
//   }[];
// }

// const HeroImageSlider: React.FC<HeroImageSliderProps> = (
//   { secOneData }
// ) => {
//   const [index, setIndex] = useState(0);

//   // Function to go to the next image
//   const nextSlide = () => {
//     setIndex((prev) => (prev + 1) % secOneData.length);
//   };

//   // Function to go to the previous image
//   const prevSlide = () => {
//     setIndex((prev) => (prev - 1 + secOneData.length) % secOneData.length);
//   };

//   // Auto slide every 3 seconds, resets when manually changed
//   useEffect(() => {
//     const interval = setInterval(nextSlide, 30000000);
//     return () => clearInterval(interval);
//   }, []); // Reset on index change

//   return (
//     <div className={styles.slider__container}>
//       {secOneData.map((item, i) => (
//         <div
//           key={i}
//           className={`
//             ${styles.image__wrapper} 
//             ${i === index ? styles.active : ""}
//           `}
//         >
//           <div className={styles.image__container}>
//             <Image
//               // src={item.image.url}
//               src={limitlessApp1}
//               alt={`Slide ${i + 1}`}
//               // layout="fill"
//               // objectFit="cover"
//               fill={true}
//               priority
//             />
//           </div>
//           <div className={styles.copy__container}>
//             <h1>{item.heading}</h1>
//             <p>{item.body}</p>
//             <button>{item.button}</button>
//           </div>
//         </div>
//       ))}

//       {/* Left Arrow Button */}
//       <button className={`${styles.arrow} ${styles.left}`} onClick={prevSlide}>
//         &#10094;
//       </button>

//       {/* Right Arrow Button */}
//       <button className={`${styles.arrow} ${styles.right}`} onClick={nextSlide}>
//         &#10095;
//       </button>
//     </div>
//   );
// };

// export default HeroImageSlider;

