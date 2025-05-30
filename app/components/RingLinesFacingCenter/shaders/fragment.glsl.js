export default `
precision mediump float;
uniform float uOpacity;

void main() {
  // example: white line with opacity controlled by uniform
  gl_FragColor = vec4(1.0, 1.0, 1.0, uOpacity);
}
`;
