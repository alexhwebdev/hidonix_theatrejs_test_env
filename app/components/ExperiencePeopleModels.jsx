"use client";

import React from 'react';
import Person from "./Person/Person";
import { Html, OrbitControls } from '@react-three/drei';
import { useEffect, useState } from 'react';


export default function ExperiencePeopleModels({
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = [0.1, 0.1, 0.1],
}) {

  return (
    <>


      {/* ---------- First row ---------- */}
      <Person
        scale={1.3}
        position={[-3.0, -2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />

      <Person
        scale={1.3}
        position={[-1.5, -2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />

      <Person
        scale={1.3}
        position={[0, -2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />

      <Person
        scale={1.3}
        position={[1.5, -2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />

      <Person
        scale={1.3}
        position={[3.0, -2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />

      {/* ---------- Second row ---------- */}
      <Person
        scale={1.3}
        position={[-2.5, -2, -2.5]}
        rotation={[-Math.PI / 2, 0, 0]}
      />

      <Person
        scale={1.3}
        position={[-1, -2, -2.5]}
        rotation={[-Math.PI / 2, 0, 0]}
      />

      <Person
        scale={1.3}
        position={[1.0, -2, -2.5]}
        rotation={[-Math.PI / 2, 0, 0]}
      />

      <Person
        scale={1.3}
        position={[2.5, -2, -2.5]}
        rotation={[-Math.PI / 2, 0, 0]}
      />



    </>
  )
}
