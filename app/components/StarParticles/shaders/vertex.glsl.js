export default `
uniform float uTime;
uniform float uRadius;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  float size = 10.0;
  gl_PointSize = size * (1.0 / -viewPosition.z);
}
`;