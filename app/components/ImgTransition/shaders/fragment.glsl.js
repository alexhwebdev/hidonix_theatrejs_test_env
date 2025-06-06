export default `
uniform float uTime;
uniform float uProgress;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform vec2 uResolution;

varying vec2 vUv;

vec2 scaleUV(vec2 uv, vec2 scale) {
  return (uv - 0.5) * scale + 0.5;
}

float hexDistance(vec2 uv) {
  vec2 s = vec2(1.0, 1.7320508);
  vec2 p = abs(uv);
  return max(dot(p, s * 0.5), p.x);
}

vec4 sround(vec4 s) {
  return floor(s + 0.5);
}

vec4 hexCoordinates(vec2 uv) {
  vec2 s = vec2(1.0, 1.7320508);
  vec4 hexCenter = sround(vec4(uv, uv - vec2(0.5, 1.0)) / vec4(s, s));
  vec4 offsetA = vec4(uv - hexCenter.xy * s, uv - (hexCenter.zw + vec2(0.5)) * s);

  float d1 = dot(offsetA.xy, offsetA.xy);
  float d2 = dot(offsetA.zw, offsetA.zw);

  vec4 final1 = vec4(offsetA.xy, hexCenter.xy);
  vec4 final2 = vec4(offsetA.zw, hexCenter.zw);

  return mix(final1, final2, step(0.0, d1 - d2));
}

float remap(float value, float inMin, float inMax, float outMin, float outMax) {
  return outMin + (value - inMin) * (outMax - outMin) / (inMax - inMin);
}

void main() {
  vec2 aspect = vec2(1.0, uResolution.x / uResolution.y);
  vec2 corUV = scaleUV(vUv, vec2(1.0, uResolution.y / uResolution.x));
  vec2 distUV = scaleUV(corUV, vec2(1.0 + length((vUv - 0.5) * 1.0)));

  vec2 hexUv = distUV * 20.0;
  vec4 hexCoords = hexCoordinates(hexUv);
  float hexDist = hexDistance(hexCoords.xy) + 0.03;

  float border = smoothstep(0.51, 0.52, hexDist);
  float y = pow(max(0.0, 0.5 - hexDist), 10.0) * 1.5;

  float z = fract(sin(dot(hexCoords.zw, vec2(12.9898, 78.233))) * 43758.5453); // noise

  float offset = 0.2;
  float bounce = 1.0 - smoothstep(0.0, 0.5, abs(uProgress - 0.5));

  float blendCut = smoothstep(
    vUv.y - offset,
    vUv.y + offset,
    remap(uProgress + z * 0.8 * bounce, 0.0, 1.0, -offset, 1.0 + offset)
  );

  float merge = 1.0 - smoothstep(0.0, 0.5, abs(blendCut - 0.5));
  float cut = step(vUv.y, uProgress + (y + z) * 0.15 * bounce);

  vec2 textureUV = corUV + y * sin(vUv.y * 15.0 - uTime) * merge * 0.025;

  vec2 fromUV = scaleUV(textureUV, vec2(1.0 + z * 0.2 * merge + uProgress));
  vec2 toUV = scaleUV(textureUV, vec2(1.0 + z * 0.2 * blendCut + uProgress));

  vec4 color1 = texture2D(uTexture1, toUV);
  vec4 color2 = texture2D(uTexture2, fromUV);
  vec4 final = mix(color1, color2, cut);

  vec3 orange = vec3(1.0, 0.4, 0.0) * merge * border * bounce * 2.0;
  final.rgb += orange;

  gl_FragColor = final;
}

`;
