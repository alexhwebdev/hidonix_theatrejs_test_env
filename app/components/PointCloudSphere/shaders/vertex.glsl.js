export default `
  varying vec3 vColor;
  void main() {
    vColor = color;
    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = 2.0; // Adjust size here
    gl_Position = projectionMatrix * modelViewPosition;
  }
`;