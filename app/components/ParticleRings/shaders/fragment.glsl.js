export default `
uniform float uOpacity;
varying vec3 vColor;

void main() {
  float dist = length(gl_PointCoord - vec2(0.5));
  if (dist > 0.5) discard;
  // gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  gl_FragColor = vec4(vColor, uOpacity);  // Use the uOpacity uniform to control transparency
}
`;
