export default `
// uniform vec2 uResolution;
// uniform float uSize;

// void main()
// {
//     // Final position
//     vec4 modelPosition = modelMatrix * vec4(position, 1.0);
//     vec4 viewPosition = viewMatrix * modelPosition;
//     vec4 projectedPosition = projectionMatrix * viewPosition;
//     gl_Position = projectedPosition;

//     // Point size
//     // gl_PointSize = uSize * uResolution.y;
//     // gl_PointSize *= (1.0 / - viewPosition.z);
    
//     // replaced top code with below in R3F transition
//     gl_PointSize = uSize;
// }

uniform vec2 uResolution;
uniform float uSize;

varying float vDepth;
varying float vColorId; // New varying to hold color ID
attribute float aColor;
void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    // // Pass depth to fragment shader
    // vDepth = -viewPosition.z;
    
    // Use absolute value of Z position (make sure depth is positive for fading)
    vDepth = abs(viewPosition.z);

    vColorId = aColor; // Pass the random color ID to the fragment shader

    gl_PointSize = uSize;
}
`;
