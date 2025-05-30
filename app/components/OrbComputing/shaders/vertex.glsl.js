export default `
uniform vec2 uResolution;
uniform float uSize;
uniform sampler2D uParticlesTexture;
attribute vec2 aParticlesUv;
attribute vec3 aColor;
attribute float aSize;
varying vec3 vColor;

void main()
{
    vec4 particle = texture(uParticlesTexture, aParticlesUv);
    vec4 modelPosition = modelMatrix * vec4(particle.xyz, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    gl_PointSize = aSize * uSize * uResolution.y;
    gl_PointSize *= (0.5 / - viewPosition.z); 

    vColor = aColor;     // Baked colors
}
`;
