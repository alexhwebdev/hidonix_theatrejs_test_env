export default /* glsl */`
uniform float uSize;
varying vec2 vUv;
varying float vY; // will hold world-space Y
uniform float uRevealY;
varying float beltMix; // how much this point contributes to belt
uniform float uBeltWidth;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vY = modelPosition.y;

    // Determine how close this particle is to the belt line
    float band = abs(vY - uRevealY);
    beltMix = smoothstep(0.05, 0.0, band); // 5cm belt width

    // Shift belt particles vertically onto the reveal edge
    modelPosition.y = mix(modelPosition.y, uRevealY, beltMix);

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    gl_PointSize = uSize;
}
`;





// Wobbly belt effect
// export default /* glsl */`
// uniform float uSize;
// varying vec2 vUv;
// varying float vY; // will hold world-space Y
// uniform float uRevealY;
// varying float beltMix; // how much this point contributes to belt
// uniform float uBeltWidth;
// void main() {
//     vec4 modelPosition = modelMatrix * vec4(position, 1.0);
//     vY = modelPosition.y;

//     // Thicker belt: widen the region around uRevealY
//     float band = abs(vY - uRevealY);
//     beltMix = smoothstep(uBeltWidth, 0.0, band); // wider belt band

//     // Shift belt particles to uRevealY (fake belt)
//     modelPosition.y = mix(modelPosition.y, uRevealY, beltMix);

//     vec4 viewPosition = viewMatrix * modelPosition;
//     vec4 projectedPosition = projectionMatrix * viewPosition;

//     gl_Position = projectedPosition;
//     gl_PointSize = uSize;
// }
// `;