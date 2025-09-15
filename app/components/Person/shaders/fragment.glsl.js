export default /* glsl */`
uniform float uRevealY;
varying float beltMix;
varying float vY;
uniform float uTime;

void main() {
  vec2 uv = gl_PointCoord;
  float dist = length(uv - 0.5);
  float pointAlpha = smoothstep(0.5, 0.0, dist);

  // Reveal fade
  float revealAlpha = smoothstep(uRevealY + 0.15, uRevealY - 0.95, vY);

  // Belt gets a stronger brightness
  float belt = beltMix;

  // Final alpha and color
  float alpha = pointAlpha * (revealAlpha + belt * 1.5);
  if (alpha < 0.01) discard;

//   vec3 baseColor = vec3(0.6, 0.4, 1.0);
//   vec3 beltColor = vec3(1.0); // pure white

  vec3 baseColor = vec3(0.4, 0.0, 0.0);   // dark red
  vec3 beltColor = vec3(1.0, 0.2, 0.2);   // glowing red

  vec3 color = mix(baseColor, beltColor, belt);

  gl_FragColor = vec4(color, alpha);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}

`;





// Wobbly belt effect
// export default /* glsl */`
// uniform float uRevealY;
// varying float beltMix;
// varying float vY;
// uniform float uTime;

// void main() {
//   vec2 uv = gl_PointCoord;
//   float dist = length(uv - 0.5);
//   float pointAlpha = smoothstep(0.5, 0.0, dist);

//   // Body reveal gradient
//   float revealAlpha = smoothstep(uRevealY + 0.15, uRevealY - 0.95, vY);

//   // Final alpha and color
//   float belt = beltMix;
//   float alpha = pointAlpha * (revealAlpha + belt * 1.5);
//   if (alpha < 0.01) discard;

//   vec3 baseColor = vec3(0.6, 0.4, 1.0);
//   vec3 beltColor = vec3(1.0); // white for belt
//   vec3 color = mix(baseColor, beltColor, belt);

//   gl_FragColor = vec4(color, alpha);

//   #include <tonemapping_fragment>
//   #include <colorspace_fragment>
// }

// `;
