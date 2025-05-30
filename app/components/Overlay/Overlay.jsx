"use client"
import React, { useRef, forwardRef, useState, useEffect } from "react"
import Image from 'next/image';
import "./overlay.scss"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import GsapAnimateElement from "@/utils/GsapAnimateElement";
import { Canvas, useThree, useFrame } from '@react-three/fiber';

const Overlay = forwardRef(({ caption, scroll }, ref) => {
  const [opacity, setOpacity] = useState(0) // start fully transparent
  // const fadeInDelay = 1000;
  const [sectionTwoOpacity, setSectionTwoOpacity] = useState(0) // new opacity for second section fade in/out
  const [sectionThreeOpacity, setSectionThreeOpacity] = useState(0) // opacity for third section

  // useEffect(() => {
  //   // Fade in on mount
  //   const fadeInTimeout = setTimeout(() => {
  //     setOpacity(1)
  //   }, 0) // slight delay for fade effect

  //   return () => clearTimeout(fadeInTimeout)
  // }, [])
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      "#section_one__id", 
      { opacity: 0},
      { 
        // scroller: ".overlay_scroll", DOES NOT WORK HERE
        delay: 1,
        opacity: 1, 
        // top: "0px", 
        ease: "power1.out", 
        duration: 1,
      })
      .fromTo(
        ".numbered_boxes .one", 
        { 
          background: "#B21F29",
          border: "1px solid black",
          color: "black",
        },
        { 
          // scroller: ".overlay_scroll", DOES NOT WORK HERE
          delay: 1,
          opacity: 1, 
          // top: "0px", 
          ease: "power1.out", 
          duration: 1,
        })
      ScrollTrigger.refresh();
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // -------------------- Fade Out : S1, S2, S3
    GsapAnimateElement(
      ".sticky", { opacity: 1 },{ opacity: 0 },
      {
        start: "90% 20%",
        end: "90% 0%",
        scrub: true,
        scroller: ".overlay_scroll",
        // markers: {
        //   startColor: "green",
        //   endColor: "red",
        // }
      }
    );


    // // -------------------- S1
    // GsapAnimateElement(
    //   ".numbered_boxes", 
    //   { opacity: 1 },{ opacity: 0 },
    //   {
    //     start: "90% 80%",
    //     end: "90% 60%",
    //     scrub: true,
    //     scroller: ".overlay_scroll",
    //     markers: {
    //       startColor: "blue",
    //       endColor: "yellow",
    //     }
    //   }
    // );

    // -------------------- Fade In : S2
    GsapAnimateElement(
      ".copy_two", { opacity: 0 },{ opacity: 1 },
      {
        start: "90% 80%",
        end: "90% 60%",
        scrub: true,
        scroller: ".overlay_scroll",
        // markers: {
        //   startColor: "blue",
        //   endColor: "yellow",
        // }
      }
    );

    // -------------------- Fade In : S3
    GsapAnimateElement(
      ".copy_three", { opacity: 0 },{ opacity: 1 },
      {
        start: "90% 80%",
        end: "90% 60%",
        scrub: true,
        scroller: ".overlay_scroll",
        // markers: {
        //   startColor: "blue",
        //   endColor: "yellow",
        // }
      }
    );

    // -------------------- Fade In : S4
    GsapAnimateElement(
      ".copy_four", { opacity: 0 },{ opacity: 1 },
      {
        start: "90% 80%",
        end: "90% 60%",
        scrub: true,
        scroller: ".overlay_scroll",
        // markers: {
        //   startColor: "blue",
        //   endColor: "yellow",
        // }
      }
    );

    // -------------------- Fade In : S5
    GsapAnimateElement(
      ".copy_five", { opacity: 0 },{ opacity: 1 },
      {
        start: "100% 100%",
        end: "300% 50%",
        scrub: true,
        scroller: ".overlay_scroll",
        // markers: {
        //   startColor: "blue",
        //   endColor: "yellow",
        // }
      }
    );

    GsapAnimateElement(
      ".hori__section", 
      { x: '100%' }, 
      { x: '-62.5%' },
      {
        start: "100% 100%",
        end: "300% 50%",
        scrub: true,
        scroller: ".overlay_scroll",
        // markers: {
        //   startColor: "yellow",
        //   endColor: "orange",
        // }
      }
    );

    // -------------------- SVG Line drawing animation
    let svg = document.querySelector('.scroll_timeline__svg');
    let path = svg.querySelector('path');
    const pathLength = path.getTotalLength();
    console.log('Path length:', pathLength);
    
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    let scrolledAmount;

    gsap.fromTo(
      path,
      { strokeDashoffset: pathLength },
      {
        strokeDashoffset: 0,
        duration: 100,
        ease: "none",
        scrollTrigger: {
          trigger: ".scroll_timeline__svg",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          scroller: ".overlay_scroll",
          // markers: true,
          onUpdate: self => {
            scrolledAmount = self.scroll(); // update value
            console.log('Scrolled amount:', scrolledAmount);
          }
        }
      }
    );

    // GsapAnimateElement(
    //   ".numbered_boxes .two", 
    //   { opacity: 0 },
    //   { 
    //     opacity: 1,
    //     background: "#B21F29",
    //   },
    //   {
    //     start: "1000% 80%",
    //     end: "1000% 60%",
    //     scrub: true,
    //     scroller: ".overlay_scroll",
    //     markers: {
    //       startColor: "blue",
    //       endColor: "yellow",
    //     }
    //   }
    // );
    
  }, [])
  // const documentHeight = Math.max(
  //   document.body.scrollHeight,
  //   document.documentElement.scrollHeight,
  //   document.body.offsetHeight,
  //   document.documentElement.offsetHeight,
  //   document.body.clientHeight,
  //   document.documentElement.clientHeight
  // );
  
  // console.log(documentHeight);

  return (
    <div
      ref={ref}
      // onScroll={(e) => {
      //   scroll.current = e.target.scrollTop / (e.target.scrollHeight - window.innerHeight)
      //   caption.current.innerText = scroll.current.toFixed(2)
      // }}
      className="overlay_scroll"
      // onScroll={handleScroll}
    >
      <div className={`scroll_timeline`}>
        <div className={`scroll_timeline__svg`}>
          <svg width="4" height="500" viewBox="0 0 4 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 0V500" stroke="#9e1b24" strokeWidth="3"/>
          </svg>
          {/* <svg width="2" height="500" viewBox="0 0 2 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 0V500" stroke="white"/>
          </svg> */}
        </div>

        <svg className={`scroll_timeline__track`} width="1" height="8000" viewBox="0 0 1 8000" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 0V500" stroke="darkgray"/>
        </svg>

        <div className="numbered_boxes">
          <div className={`one`}>1</div>
          <div className={`two`}>2</div>
          <div className={`three`}>3</div>
          <div className={`four`}>4</div>
        </div>
      </div>


      <section 
        id={`section_one__id`} 
        className="section copy"
        style={{ 
          height: "200vh" 
        }}
      >
        <div className="sticky testclass">
          <div className="copy"
            style={{ 
              // opacity, 
              // transition: 'opacity 0.5s ease', 
              // transitionDelay: opacity === 1 ? '0s' : '0s'
            }}
          >
            <span>1</span>
            <p>Artificial Intelligence</p>
            <h1>Spacial Intelligence</h1>
          </div>
          
          <div 
            className={`plotted_triangle__container`}
            style={{ 
              opacity, 
              transition: 'opacity 0.5s ease', 
              transitionDelay: opacity === 1 ? '0s' : '0s'
            }}
          >
            {/* <div className="dashed__lines bottom_left_to_top"></div>
            <div className="dashed__lines bottom_right_to_top"></div>
            <div className="dashed__lines bottom"></div>
            
            <svg style={{display: 'none'}} width="502" height="435" viewBox="0 0 502 435" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="cls-1"  d="M501 434H1L255.007 1L501 434Z" stroke="black"/>
            </svg> */}

            {/* UNCOMMENT THIS */}
            {/* <div className="image_wrapper">
              <div className="outer__border top">
                <div className="second__border">
                  <div className="box"></div>
                </div>
              </div>
              <div className="outer__border bottom_left">
                <div className="second__border">
                  <div className="box"></div>
                </div>
              </div>
              <div className="outer__border bottom_right">
                <div className="second__border">
                  <div className="box"></div>
                </div>
              </div>
              <Image
                className="dashed_triangle"
                src={'/dashed-triangle.svg'}
                alt={"TEST"}
                width={800}
                height={692}
                quality={100}
                style={{ width: '100%', height: 'auto', opacity, transition: 'opacity 0.5s ease', transitionDelay: opacity === 1 ? '2s' : '0s' }}
              />
            </div> */}
          </div>
        </div>
      </section>

      <section
        id={`section_two__id`}
        className="section copy"
        style={{
          height: "200vh",
          // opacity: sectionTwoOpacity,
          // transition: "opacity 0.5s ease",
          // position: "sticky",
          top: 0
        }}
      >
        <div className="sticky copy_two">
          <div className="copy">
            <h3>Ground Drones ( Hido )</h3>
            <p>
              Lorem bortis, placerat Cras urna fringilla risus vehicula, nulla, felis, hendrerit ullamcorper adipiscing adipiscing in orci sapien ex vitae fringilla facilisis hendrerit ullamcorper adipiscing adipiscing in orci sapien ex vitae fringilla facilisis
            </p>
          </div>

          <Image
            className="hido"
            src={'/hido.png'}
            alt={"TEST"}
            width={800}
            height={692}
            quality={100}
            // style={{ width: '100%', height: 'auto', opacity, transition: 'opacity 0.5s ease', transitionDelay: opacity === 1 ? '2s' : '0s' }}
          />

          {/* <div className={`plotted_triangle__container`}>
            <div className="dashed__lines bottom_left_to_top"></div>
            <div className="dashed__lines bottom_right_to_top"></div>
            <div className="dashed__lines bottom"></div>
            <svg style={{display: 'none'}} width="502" height="435" viewBox="0 0 502 435" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="cls-1"  d="M501 434H1L255.007 1L501 434Z" stroke="white"/>
            </svg>
          </div> */}
        </div>
      </section>

      <section 
        id={`section_three__id`} 
        className="section copy"
        style={{ 
          height: "200vh",
          // opacity: sectionThreeOpacity,
          // transition: "opacity 0.5s ease",
          // position: "sticky",
          top: 0
        }}
      >
        <div 
          className="sticky"
          // className="sticky copy_three"
        >
          <div className="copy">
            <span>3</span>
            <p>Artificial Intelligence 3</p>
            <h1>Spacial Intelligence 3</h1>
          </div>
        </div>
      </section>

      <section 
        id={`section_four__id`} 
        className="section copy"
        style={{ 
          height: "200vh",
          // opacity: sectionThreeOpacity,
          // transition: "opacity 0.5s ease",
          // position: "sticky",
          top: 0
        }}
      >
        <div className="sticky copy_four">
          <div className="copy">
            <span>4</span>
            <p>Artificial Intelligence 4</p>
            <h1>Spacial Intelligence 4</h1>
          </div>
        </div>
      </section>


      <section 
        id={`section_five__id`} 
        className="section copy"
        style={{ 
          height: "400vh",
          // opacity: sectionThreeOpacity,
          // transition: "opacity 0.5s ease",
          // position: "sticky",
          top: 0
        }}
      >
        <div className="sticky copy_five">
          {/* <div className="copy">
            <span>5</span>
            <p>Artificial Intelligence 5</p>
            <h1>Spacial Intelligence 5</h1>
          </div> */}

          <section className="hori__section">
            <div className="hori__panel zero">
              <div className="img">
                <Image
                  className="building"
                  src={'/building.png'}
                  alt={"TEST"}
                  width={200}
                  height={400}
                  quality={100}
                  // style={{ width: '100%', height: 'auto', opacity, transition: 'opacity 0.5s ease', transitionDelay: opacity === 1 ? '2s' : '0s' }}
                />
              </div>
              <div className="copy">
                <h3>Indoor Navigation</h3>
                <p>
                  Lorem bortis, placerat Cras urna fringilla risus vehicula, nulla, felis, hendrerit ullamcorper adipiscing adipiscing in orci sapien ex vitae fringilla facilisis hendrerit ullamcorper adipiscing adipiscing in orci sapien ex vitae fringilla facilisis
                </p>
              </div>
            </div>
            <div className="hori__panel one">one</div>
            <div className="hori__panel two">two</div>
            <div className="hori__panel three">three</div>
          </section>
        </div>
      </section>



      <section 
        id={`section_six__id`} 
        className="section copy"
        style={{ 
          height: "200vh",
          // opacity: sectionThreeOpacity,
          // transition: "opacity 0.5s ease",
          // position: "sticky",
          top: 0
        }}
      >
        <div className="sticky copy_four">
          <div className="copy">
            <span>6</span>
            <p>Artificial Intelligence 6</p>
            <h1>Spacial Intelligence 6</h1>
          </div>
        </div>
      </section>

      {/* <span className="caption" ref={caption}>
        0.00
      </span> */}
    </div>
  )
})

export default Overlay