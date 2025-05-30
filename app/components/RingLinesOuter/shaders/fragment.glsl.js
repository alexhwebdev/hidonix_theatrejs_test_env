export default `
uniform float uOpacity;
varying vec3 vColor;

void main() {
  vec2 uv = gl_PointCoord - 0.5;

  float lineWidth = 0.05;
  float maxHeight = 2.9;

  float curvedY = uv.y + uv.x * uv.x * 0.5;

  float shape = pow(uv.x / lineWidth, 2.0) + pow(curvedY / maxHeight, 2.0);

  if (shape > 1.0) discard;

  float alpha = smoothstep(1.0, 0.7, shape);

  gl_FragColor = vec4(vColor, alpha * uOpacity);
}
`;
