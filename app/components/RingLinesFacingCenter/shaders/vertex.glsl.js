export default `
precision mediump float;

attribute vec3 position;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

uniform float uTime;
uniform float uRadius;

varying vec3 vColor;

void main() {
  vColor = vec3(1.0);  // static white color

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 clipPosition = projectionMatrix * viewPosition;

  gl_Position = clipPosition;
}
`;
