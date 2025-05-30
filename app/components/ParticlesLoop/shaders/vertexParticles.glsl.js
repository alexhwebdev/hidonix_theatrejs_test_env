export default `
uniform float time;
uniform sampler2D uPositions;
varying vec2 vUv;
varying vec4 vColor;

void main() {
    vUv = uv;
    vec4 pos = texture2D(uPositions, uv);
    float angle = atan(pos.y, pos.x);    // <— use reconstructed angle
    
    // vColor = vec4(vec3(fract(time * 0.1)), 1.0);  // DEBUG
    vColor = vec4(0.5 + 0.45 * sin(angle + time));

    // pos.x += sin(time + uv.y * 10.0) * 0.1;
    vec4 mvPosition = modelViewMatrix * vec4(pos.xyz, 1.0);
    gl_PointSize = 1.0 * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}
`;

// export default `;
// uniform float time;
// uniform sampler2D uPositions;
// varying vec2 vUv;
// varying vec4 vColor;

// void main() {
//     vUv = uv;
//     vec4 pos = texture2D(uPositions, uv);

//     float angle = atan(pos.y, pos.x);    // <— use reconstructed angle
//     float radius = length(pos.xy);       // <— use radius for potential effects

//     // Rotate the dark section by offsetting the angle with time
//     float rotatedAngle = angle + time * 0.4;

//     // Controls dark shadow follwing the particles.
//     // Gives dissapearing effect.
//     // vColor passed to fragment.glsl
//     // vColor = 0.8 * vec4(0.5 + 0.45 * sin(angle + time * 0.4));
//     vColor = 0.8 * vec4(vec3(0.5 + 0.45 * sin(rotatedAngle)), 1.0);

//     vec4 mvPosition = modelViewMatrix * vec4(pos.xyz, 1.0);
//     gl_PointSize = 1.0 * (1.0 / -mvPosition.z);
//     gl_Position = projectionMatrix * mvPosition;
// }
// `;

// // What your vertexParticles.glsl does:
// // It reads the updated particle position from the simulation texture.
// // Computes color based on angle + time.
// // Sets point size relative to depth.
// // Positions the particle.
