export default `
varying vec3 vColor;

void main()
{
    float distanceToCenter = length(gl_PointCoord - 0.5);
    if(distanceToCenter > 0.5)
        discard;

    gl_FragColor = vec4(vColor, 1.0);

    // float strength = vUv.x;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
`