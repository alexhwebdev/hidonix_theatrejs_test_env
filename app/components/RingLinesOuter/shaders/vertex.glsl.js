export default `
varying vec3 vColor;

void main() {
  vColor = vec3(1.0);
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;

  gl_PointSize = 1.0;  // bigger points to allow long curved lines
}
`;
