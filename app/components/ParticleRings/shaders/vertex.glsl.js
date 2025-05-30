export default `
uniform float uTime;
uniform float uRadius;
varying vec3 vColor;

void main() {
  vColor = vec3(1.0, 1.0, 1.0);  // White color (you can change this to whatever color you need)

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  float size = 10.0;
  gl_PointSize = size * (1.0 / -viewPosition.z);
}
`;
