"use client";

import { motion } from "framer-motion";
import "./ui.scss"

export const UI = ({ currentScreen, onScreenChange, isAnimating }) => {
  return (
    <motion.main
      className="ui__container"
      animate={isAnimating ? "" : currentScreen}
    >
      {/* --------------- SECTION 1 --------------- */}
      <section
        className={`ui__section center ${
          currentScreen === "Scene1" && !isAnimating
            ? ""
            : "ui__hidden"
        }`}
      >
        <h1 className="ui__title">Section 1</h1>
        <motion.div
          className="ui__buttons"
          initial={{ y: 80, opacity: 0 }}
          variants={{
            Scene1: {
              y: 0,
              opacity: 1,
              transition: { delay: 0.2, duration: 1.2 },
            },
          }}
        >
          <button onClick={() => onScreenChange("Scene2")} className="ui__button">Section 2</button>
          <button onClick={() => onScreenChange("Scene3")} className="ui__button">Section 3</button>
        </motion.div>
      </section>


      {/* --------------- SECTION 2 --------------- */}
      <motion.section
        animate={isAnimating ? "" : currentScreen}
        className={`ui__section left ${
          currentScreen === "Scene2" && !isAnimating
            ? ""
            : "ui__hidden"
        }`}
      >
        <div className="ui__content">
          <motion.h1
            className="ui__title"
            initial={{ y: 80, opacity: 0 }}
            variants={{
              Scene2: {
                y: 0,
                opacity: 1,
                transition: { delay: 0.2, duration: 1.2 },
              },
            }}
          >
            Section 2
          </motion.h1>
          <motion.p
            className="ui__text"
            initial={{ y: 80, opacity: 0 }}
            variants={{
              Scene2: {
                y: 0,
                opacity: 1,
                transition: { delay: 0.6, duration: 1.2 },
              },
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </motion.p>
          <motion.button
            onClick={() => onScreenChange("Scene1")}
            className="ui__button"
            initial={{ y: 80, opacity: 0 }}
            variants={{
              Scene2: {
                y: 0,
                opacity: 1,
                transition: { delay: 1, duration: 1.2 },
              },
            }}
          >
            Section 1
          </motion.button>
          <motion.button
            onClick={() => onScreenChange("Scene3")}
            className="ui__button"
            initial={{ y: 80, opacity: 0 }}
            variants={{
              Scene2: {
                y: 0,
                opacity: 1,
                transition: { delay: 1, duration: 1.2 },
              },
            }}
          >
            Section 3
          </motion.button>
        </div>
      </motion.section>


      {/* --------------- SECTION 3 --------------- */}
      <motion.section
        animate={isAnimating ? "" : currentScreen}
        className={`ui__section left ${
          currentScreen === "Scene3" && !isAnimating
            ? ""
            : "ui__hidden"
        }`}
      >
        <div className="ui__content">
          <motion.h1
            className="ui__title"
            initial={{ y: 80, opacity: 0 }}
            variants={{
              Scene3: {
                y: 0,
                opacity: 1,
                transition: { delay: 0.2, duration: 1.2 },
              },
            }}
          >
            Section 3
          </motion.h1>
          <motion.p
            className="ui__text"
            initial={{ y: 80, opacity: 0 }}
            variants={{
              Scene3: {
                y: 0,
                opacity: 1,
                transition: { delay: 0.6, duration: 1.2 },
              },
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </motion.p>

        </div>
      </motion.section>


      {/* --------------- SECTION 4 --------------- */}
      <motion.section
        animate={isAnimating ? "" : currentScreen}
        className={`ui__section left ${
          currentScreen === "Scene4" && !isAnimating
            ? ""
            : "ui__hidden"
        }`}
      >
        <div className="ui__content">
          <motion.h1
            className="ui__title"
            initial={{ y: 80, opacity: 0 }}
            variants={{
              Scene4: {
                y: 0,
                opacity: 1,
                transition: { delay: 0.2, duration: 1.2 },
              },
            }}
          >
            Section 4
          </motion.h1>
          <motion.p
            className="ui__text"
            initial={{ y: 80, opacity: 0 }}
            variants={{
              Scene4: {
                y: 0,
                opacity: 1,
                transition: { delay: 0.6, duration: 1.2 },
              },
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </motion.p>

        </div>
      </motion.section>


      {/* --------------- SECTION 5 --------------- */}
      <motion.section
        animate={isAnimating ? "" : currentScreen}
        className={`ui__section left ${
          currentScreen === "Scene5" && !isAnimating
            ? ""
            : "ui__hidden"
        }`}
      >
        <div className="ui__content">
          <motion.h1
            className="ui__title"
            initial={{ y: 80, opacity: 0 }}
            variants={{
              Scene5: {
                y: 0,
                opacity: 1,
                transition: { delay: 0.2, duration: 1.2 },
              },
            }}
          >
            Section 5
          </motion.h1>
          <motion.p
            className="ui__text"
            initial={{ y: 80, opacity: 0 }}
            variants={{
              Scene5: {
                y: 0,
                opacity: 1,
                transition: { delay: 0.6, duration: 1.2 },
              },
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </motion.p>

        </div>
      </motion.section>



      {/* --------------- SECTION 6 --------------- */}
      <motion.section
        animate={isAnimating ? "" : currentScreen}
        className={`ui__section left ${
          currentScreen === "Scene6" && !isAnimating
            ? ""
            : "ui__hidden"
        }`}
      >
        <div className="ui__content">
          <motion.h1
            className="ui__title"
            initial={{ y: 80, opacity: 0 }}
            variants={{
              Scene6: {
                y: 0,
                opacity: 1,
                transition: { delay: 0.2, duration: 1.2 },
              },
            }}
          >
            Section 6
          </motion.h1>
          <motion.p
            className="ui__text"
            initial={{ y: 80, opacity: 0 }}
            variants={{
              Scene6: {
                y: 0,
                opacity: 1,
                transition: { delay: 0.6, duration: 1.2 },
              },
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </motion.p>

        </div>
      </motion.section>


    </motion.main>
  );
};

