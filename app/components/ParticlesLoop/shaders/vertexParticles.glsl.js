export default `
uniform float time;
uniform sampler2D uPositions;
varying vec2 vUv;
varying vec4 vColor;

uniform float scrollDirection;
uniform float scrollSpeed;
uniform float direction;

// // ---------- KINDA WORKING : Scroll > speed up, Reverse > move reverse, with darkside 
// void main() {
//   vUv = uv;
//   vec4 pos = texture2D(uPositions, uv);
//   float angle = atan(pos.y, pos.x);

//   // Dark side rotates based on scroll direction
//   float darkSideAngle = -time * scrollDirection;

//   float diff = angle - darkSideAngle;
//   diff = mod(diff + 3.14159, 6.28318) - 3.14159;

//   // Darkest behind, brightest in front
//   float intensity = 0.5 + 0.5 * cos(diff); // centered around diff = 0

//   vColor = vec4(intensity * 0.2, intensity * 0.05, intensity * 0.05, 1.0); // Deep red

//   vec4 mvPosition = modelViewMatrix * vec4(pos.xyz, 1.0);
//   gl_PointSize = 0.01 * (1.0 / -mvPosition.z);
//   gl_Position = projectionMatrix * mvPosition;
// }



// ---------- WORKING : Scroll > speed up, Reverse > move reverse
// void main() {
//     vUv = uv;
//     vec4 pos = texture2D(uPositions, uv);
//     float angle = atan(pos.y, pos.x);

//     // The dark side rotates clockwise: define dark side angle as (-time)
//     float darkSideAngle = -time;

//     // Calculate angular difference (wrap between -PI and PI)
//     float diff = angle - darkSideAngle;
//     diff = mod(diff + 3.14159, 6.28318) - 3.14159;

//     // // vColor = vec4(vec3(fract(time * 0.1)), 1.0);  // DEBUG
//     // vColor = vec4(0.5 + 0.45 * sin(angle + time));
//     // vColor = vec4(0.4 + 0.9 * sin(angle + time));

//     float intensity = 0.5 + 0.85 * sin(angle + time); // [0.05..0.95]
//     // (intensity * lower = darker, intensity * higher = brighter)
//     vColor = vec4(intensity * 0.2, intensity * 0.05, intensity * 0.05, 1.0); // Deep red
//     // Red with shading

//     // Set point size as before
//     vec4 mvPosition = modelViewMatrix * vec4(pos.xyz, 1.0);
//     gl_PointSize = 0.01 * (1.0 / -mvPosition.z);
//     gl_Position = projectionMatrix * mvPosition;
// }




// ---------- ON NO SCROLL, paint brush stroke look with random pattern at finish
void main() {
    vUv = uv;
    vec4 pos = texture2D(uPositions, uv);
    float angle = atan(pos.y, pos.x);

    // The dark side rotates clockwise: define dark side angle as (-time)
    float darkSideAngle = -time;

    // Calculate angular difference (wrap between -PI and PI)
    float diff = angle - darkSideAngle;
    diff = mod(diff + 3.14159, 6.28318) - 3.14159;

    // // vColor = vec4(vec3(fract(time * 0.1)), 1.0);  // DEBUG
    // vColor = vec4(0.5 + 0.45 * sin(angle + time));
    // vColor = vec4(0.4 + 0.9 * sin(angle + time));

    // float intensity = 0.5 + 0.85 * sin(angle + time); // [0.05..0.95]
    float intensity = 0.7 + 0.85 * sin(angle + 4.0); // [0.05..0.95]
    // (intensity * lower = darker, intensity * higher = brighter)
    vColor = vec4(intensity * 0.2, intensity * 0.05, intensity * 0.05, 1.0); // Deep red
    // Red with shading

    // Set point size as before
    vec4 mvPosition = modelViewMatrix * vec4(pos.xyz, 1.0);
    gl_PointSize = 0.01 * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}



// ---------- ON NO SCROLL, paint brush stroke look
// void main() {
//     vUv = uv;
//     vec4 pos = texture2D(uPositions, uv);
//     float angle = atan(pos.y, pos.x);

//     // The dark side rotates clockwise: define dark side angle as (-time)
//     float darkSideAngle = -time;

//     // Calculate angular difference (wrap between -PI and PI)
//     float diff = angle - darkSideAngle;
//     diff = mod(diff + 3.14159, 6.28318) - 3.14159;

//     // // vColor = vec4(vec3(fract(time * 0.1)), 1.0);  // DEBUG
//     // vColor = vec4(0.5 + 0.45 * sin(angle + time));
//     // vColor = vec4(0.4 + 0.9 * sin(angle + time));

//     // float intensity = 0.5 + 0.85 * sin(angle + time); // [0.05..0.95]
//     float intensity = 0.7 + 0.85 * sin(angle + 4.0); // [0.05..0.95]
//     // (intensity * lower = darker, intensity * higher = brighter)
//     vColor = vec4(intensity * 0.2, intensity * 0.05, intensity * 0.05, 1.0); // Deep red
//     // Red with shading

//     // Set point size as before
//     vec4 mvPosition = modelViewMatrix * vec4(pos.xyz, 1.0);
//     gl_PointSize = 0.01 * (1.0 / -mvPosition.z);
//     gl_Position = projectionMatrix * mvPosition;
// }


// ---------- RED SWARM, BEST SO FAR
// void main() {
//     vUv = uv;
//     vec4 pos = texture2D(uPositions, uv);
//     float angle = atan(pos.y, pos.x);

//     // The dark side rotates clockwise: define dark side angle as (-time)
//     float darkSideAngle = -time;

//     // Calculate angular difference (wrap between -PI and PI)
//     float diff = angle - darkSideAngle;
//     diff = mod(diff + 3.14159, 6.28318) - 3.14159;

//     // // vColor = vec4(vec3(fract(time * 0.1)), 1.0);  // DEBUG
//     // vColor = vec4(0.5 + 0.45 * sin(angle + time));
//     // vColor = vec4(0.4 + 0.9 * sin(angle + time));

//     float intensity = 0.5 + 0.85 * sin(angle + time); // [0.05..0.95]
//     // (intensity * lower = darker, intensity * higher = brighter)
//     vColor = vec4(intensity * 0.2, intensity * 0.05, intensity * 0.05, 1.0); // Deep red
//  // Red with shading

//     // Set point size as before
//     vec4 mvPosition = modelViewMatrix * vec4(pos.xyz, 1.0);
//     gl_PointSize = 0.01 * (1.0 / -mvPosition.z);
//     gl_Position = projectionMatrix * mvPosition;
// }





// ---------- SLUG SHAPE
// void main() {
//     vUv = uv;
//     vec4 pos = texture2D(uPositions, uv);
//     float angle = atan(pos.y, pos.x);

//     // The dark side rotates clockwise: define dark side angle as (-time)
//     float darkSideAngle = -time;

//     // Calculate angular difference (wrap between -PI and PI)
//     float diff = angle - darkSideAngle;
//     diff = mod(diff + 3.14159, 6.28318) - 3.14159;

//     // // vColor = vec4(vec3(fract(time * 0.1)), 1.0);  // DEBUG
//     // vColor = vec4(0.5 + 0.45 * sin(angle + time));
//     // vColor = vec4(0.4 + 0.9 * sin(angle + time));

//     float intensity = 0.5 + 0.85 * sin(angle + time); // [0.05..0.95]
//     vColor = vec4(intensity, 0.0, 0.0, 1.0); // Red with shading

//     // Set point size as before
//     vec4 mvPosition = modelViewMatrix * vec4(pos.xyz, 1.0);
//     gl_PointSize = 0.01 * (1.0 / -mvPosition.z);
//     gl_Position = projectionMatrix * mvPosition;
// }




// ---------- ORIGINAL
// uniform float time;
// uniform sampler2D uPositions;
// varying vec2 vUv;
// varying vec4 vColor;

// void main() {
//     vUv = uv;
//     vec4 pos = texture2D(uPositions, uv);
//     float angle = atan(pos.y, pos.x);

//     // The dark side rotates clockwise: define dark side angle as (-time)
//     float darkSideAngle = -time;

//     // Calculate angular difference (wrap between -PI and PI)
//     float diff = angle - darkSideAngle;
//     diff = mod(diff + 3.14159, 6.28318) - 3.14159;

//     // // vColor = vec4(vec3(fract(time * 0.1)), 1.0);  // DEBUG
//     // vColor = vec4(0.5 + 0.45 * sin(angle + time));

// // float intensity = 0.5 + 0.45 * sin(angle + time); // [0.05..0.95]
// // vColor = vec4(intensity, 0.0, 0.0, 1.0); // Red with shading

//     // Set point size as before
//     vec4 mvPosition = modelViewMatrix * vec4(pos.xyz, 1.0);
//     gl_PointSize = 0.01 * (1.0 / -mvPosition.z);
//     gl_Position = projectionMatrix * mvPosition;
// }
`;
