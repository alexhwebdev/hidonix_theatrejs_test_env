export default `
uniform vec2 uResolution;
uniform float uSize;
varying vec2 vUv;  // Pass to fragment shader
void main()
{
    // Final position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    // Point size
    // gl_PointSize = uSize * uResolution.y;
    // gl_PointSize *= (1.0 / - viewPosition.z);
    
    // replaced top code with below in R3F transition
    gl_PointSize = uSize;
    
    // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vUv = uv;  // Pass to fragment shader
}
`;