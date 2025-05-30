export default `
// varying vec3 vColor;

// void main()
// {
//     vec2 uv = gl_PointCoord;
//     float distanceToCenter = length(uv - 0.5);
//     float alpha = 0.05 / distanceToCenter - 0.1;
    
//     // gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
//     // gl_FragColor = vec4(uv, 1.0, 1.0);
//     // gl_FragColor = vec4(alpha, alpha, alpha, 1.0);
//     gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
//     // gl_FragColor = vec4(vColor, 1.0);
//     #include <tonemapping_fragment>
//     #include <colorspace_fragment>
// }

uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;

varying float vDepth;
varying float vColorId; // Color ID passed from vertex shader

void main()
{
    vec2 uv = gl_PointCoord;
    float distanceToCenter = length(uv - 0.5);
    float alpha = 0.05 / distanceToCenter - 0.1;

    // Define near and far fade distances
    float fadeDistanceNear = 5.0; // The distance at which to start fading in (near the camera)
    float fadeDistanceFar = 5.0; // The distance at which to start fading out (far from the camera)

    // Apply fade effect based on Z depth (move away from the camera)
    // Smoothstep creates a smooth transition between the start and end distances
    float fadeNear = smoothstep(0.0, fadeDistanceNear, vDepth); // Fade in as it's closer to the camera
    float fadeFar = smoothstep(fadeDistanceFar, fadeDistanceFar + 5.0, vDepth); // Fade out as it's farther from the camera
    
    // Combine the fade-in and fade-out effects (inverted fading for far)
    float depthFade = fadeNear * (1.0 - fadeFar); 

    // Select color based on the random color ID (vColorId)
    vec3 chosenColor;
    if (vColorId == 0.0) {
        chosenColor = color1;
    } else if (vColorId == 1.0) {
        chosenColor = color2;
    } else {
        chosenColor = color3;
    }

    // Multiply the alpha by the depth fade factor
    alpha *= depthFade;

    // gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
    gl_FragColor = vec4(chosenColor, alpha);

    // #include <tonemapping_fragment>
    // #include <colorspace_fragment>
}
`;
