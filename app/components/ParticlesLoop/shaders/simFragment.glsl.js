// Your simulation shader (simFragment.glsl) is responsible for updating particle positions on each frame by reading from a position texture, applying forces, and outputting new positions. The vertex shader (vertexParticles.glsl) then reads those updated positions and renders the particles accordingly.

export default `
uniform float time;
uniform sampler2D uPositions;
uniform sampler2D uInfo;
uniform vec2 uMouse;
varying vec2 vUv;

uniform vec2 resolution;
uniform float scrollSpeed;
uniform float uDirection;  // passed from JS
uniform float direction;
precision highp float;

// CURL NOISE function (kept as is from your original)
// ---------- CURL NOISE
#define PI 3.1415926538

const float EPS = 0.001;
vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
float mod289(float x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec4 permute(vec4 x) {
    return mod289(((x*34.0)+1.0)*x);
}
float permute(float x) {
    return mod289(((x*34.0)+1.0)*x);
}
vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}
float taylorInvSqrt(float r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}
vec4 grad4(float j, vec4 ip) {
    const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
    vec4 p, s;
    p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
    p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
    s = vec4(lessThan(p, vec4(0.0)));
    p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;
    return p;
}
#define F4 0.309016994374947451

vec4 simplexNoiseDerivatives (vec4 v) {
    const vec4  C = vec4( 0.138196601125011, 0.276393202250021, 0.414589803375032, -0.447213595499958);
    vec4 i = floor(v + dot(v, vec4(F4)) );
    vec4 x0 = v -   i + dot(i, C.xxxx);
    vec4 i0;
    vec3 isX = step( x0.yzw, x0.xxx );
    vec3 isYZ = step( x0.zww, x0.yyz );
    i0.x = isX.x + isX.y + isX.z;
    i0.yzw = 1.0 - isX;
    i0.y += isYZ.x + isYZ.y;
    i0.zw += 1.0 - isYZ.xy;
    i0.z += isYZ.z;
    i0.w += 1.0 - isYZ.z;
    vec4 i3 = clamp( i0, 0.0, 1.0 );
    vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );
    vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );
    vec4 x1 = x0 - i1 + C.xxxx;
    vec4 x2 = x0 - i2 + C.yyyy;
    vec4 x3 = x0 - i3 + C.zzzz;
    vec4 x4 = x0 + C.wwww;
    i = mod289(i);
    float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);
    vec4 j1 = permute( permute( permute( permute (
    i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))
    + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))
    + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))
    + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));
    vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;
    vec4 p0 = grad4(j0, ip);
    vec4 p1 = grad4(j1.x, ip);
    vec4 p2 = grad4(j1.y, ip);
    vec4 p3 = grad4(j1.z, ip);
    vec4 p4 = grad4(j1.w, ip);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    p4 *= taylorInvSqrt(dot(p4, p4));
    vec3 values0 = vec3(dot(p0, x0), dot(p1, x1), dot(p2, x2)); //value of contributions from each corner at point
    
    vec2 values1 = vec2(dot(p3, x3), dot(p4, x4));
    vec3 m0 = max(0.5 - vec3(dot(x0, x0), dot(x1, x1), dot(x2, x2)), 0.0); //(0.5 - x^2) where x is the distance
    
    vec2 m1 = max(0.5 - vec2(dot(x3, x3), dot(x4, x4)), 0.0);
    vec3 temp0 = -6.0 * m0 * m0 * values0;
    vec2 temp1 = -6.0 * m1 * m1 * values1;
    vec3 mmm0 = m0 * m0 * m0;
    vec2 mmm1 = m1 * m1 * m1;
    float dx = temp0[0] * x0.x + temp0[1] * x1.x + temp0[2] * x2.x + temp1[0] * x3.x + temp1[1] * x4.x + mmm0[0] * p0.x + mmm0[1] * p1.x + mmm0[2] * p2.x + mmm1[0] * p3.x + mmm1[1] * p4.x;
    float dy = temp0[0] * x0.y + temp0[1] * x1.y + temp0[2] * x2.y + temp1[0] * x3.y + temp1[1] * x4.y + mmm0[0] * p0.y + mmm0[1] * p1.y + mmm0[2] * p2.y + mmm1[0] * p3.y + mmm1[1] * p4.y;
    float dz = temp0[0] * x0.z + temp0[1] * x1.z + temp0[2] * x2.z + temp1[0] * x3.z + temp1[1] * x4.z + mmm0[0] * p0.z + mmm0[1] * p1.z + mmm0[2] * p2.z + mmm1[0] * p3.z + mmm1[1] * p4.z;
    // float dw = temp0[0] * x0.w + temp0[1] * x1.w + temp0[2] * x2.w + temp1[0] * x3.w + temp1[1] * x4.w + mmm0[0] * p0.w + mmm0[1] * p1.w + mmm0[2] * p2.w + mmm1[0] * p3.w + mmm1[1] * p4.w;
    
    
    // return vec4(dx, dy, dz, dw) * 49.0;
    return vec4(dx, dy, dz, 0.0) * 49.0;
}
vec3 curl( in vec3 p, in float noiseTime, in float persistence ) {
    vec4 xNoisePotentialDerivatives = vec4(0.0);
    vec4 yNoisePotentialDerivatives = vec4(0.0);
    // vec4 zNoisePotentialDerivatives = vec4(0.0);
    
    
    for (int i = 0; i < 2; ++i) {
        float twoPowI = pow(2.0, float(i));
        float scale = 0.5 * twoPowI * pow(persistence, float(i));
        xNoisePotentialDerivatives += simplexNoiseDerivatives(vec4(p * twoPowI, noiseTime)) * scale;
        yNoisePotentialDerivatives += simplexNoiseDerivatives(vec4((p + vec3(123.4, 129845.6, -1239.1)) * twoPowI, noiseTime)) * scale;
        // zNoisePotentialDerivatives += snoise4(vec4((p + vec3(-9519.0, 9051.0, -123.0)) * twoPowI, noiseTime)) * scale;
    }
    return vec3(
    yNoisePotentialDerivatives[1] - xNoisePotentialDerivatives[1], yNoisePotentialDerivatives[2] - xNoisePotentialDerivatives[2], yNoisePotentialDerivatives[0] - xNoisePotentialDerivatives[0]
    );
}
// ---------- /CURL NOISE


// // ---------- KINDA WORKING : Scroll > speed up, Reverse > move reverse, with darkside 
// void main() {
//     vec2 vUv = gl_FragCoord.xy / resolution.xy;
//     vec4 pos = texture2D(uPositions, vUv);
//     vec4 info = texture2D(uInfo, vUv);

//     float radius = length(pos.xy);
//     float circularForce = 1.0 - smoothstep(10.3, 1.4, abs(pos.x - radius));

//     float direction = uDirection; // Use last non-zero scroll direction

//     float speedMultiplier = 1.0 + abs(scrollSpeed) * 10.0;

//     float angle = atan(pos.y, pos.x) - info.y * 0.3 * direction * mix(0.5, 1.0, circularForce);

//     float targetRadius = mix(
//         info.x,
//         4.0,
//         0.5 + 0.45 * sin(angle + time * 0.0002)
//     );

//     radius += (targetRadius - radius) * mix(0.9, 0.05, circularForce);
//     vec3 targetPos = vec3(cos(angle), sin(angle), 0.0) * radius;

//     pos.xy += (targetPos.xy - pos.xy) * 0.03 * speedMultiplier;
//     pos.xy += curl(pos.xyz * 0.7, time * 0.1, 1.0).xy * 0.003 * speedMultiplier * direction;

//     gl_FragColor = vec4(pos.xy, 1.0, 1.0);
// }




// ---------- WORKING : Scroll > speed up, Reverse > move reverse
// void main() {
//     vec2 vUv = gl_FragCoord.xy / resolution.xy; // or your varying UV
//     vec4 pos = texture2D(uPositions, vUv);
//     vec4 info = texture2D(uInfo, vUv);

//     float radius = length(pos.xy);
//     float circularForce = 1.0 - smoothstep(0.3, 1.4, abs(pos.x - radius));
    
//     // Ensure direction is never zero to keep rotation always on
//     float direction = sign(scrollSpeed);
//     if (direction == 0.0) direction = 1.0;

//     float speedMultiplier = 1.0 + abs(scrollSpeed) * 10.0;

//     float angle = atan(pos.y, pos.x) - info.y * 0.3 * direction * mix(0.5, 1.0, circularForce);

//     float targetRadius = mix(
//         info.x,
//         4.0,
//         0.5 + 0.45 * sin(angle + time * 0.0002)
//     );

//     radius += (targetRadius - radius) * mix(0.9, 0.05, circularForce);
//     vec3 targetPos = vec3(cos(angle), sin(angle), 0.0) * radius;

//     pos.xy += (targetPos.xy - pos.xy) * 0.03 * speedMultiplier;
//     pos.xy += curl(pos.xyz * 0.7, time * 0.1, 1.0).xy * 0.003 * speedMultiplier * direction;

//     gl_FragColor = vec4(pos.xy, 1.0, 1.0);
// }





// ---------- ON NO SCROLL, paint brush stroke look with random pattern at finish
void main() {
    vec2 vUv = gl_FragCoord.xy / resolution.xy;
    vec4 pos = texture2D(uPositions, vUv);
    vec4 info = texture2D(uInfo, vUv);

    float radius = length(pos.xy);
    float direction = sign(scrollSpeed);
    float speedMultiplier = 1.0 + abs(scrollSpeed) * 10.0;
    float circularForce = 1.0 - smoothstep(10.3, 0.4, abs(pos.x - radius));

    // Base angle + random angular offset to break layering
    float angle = atan(pos.y, pos.x);
    float randomAngleOffset = sin(info.z * 100.0) * 0.5;
    angle += randomAngleOffset;

    // Rotation only when scrolling, tiny motion when idle
    float angularVelocity = info.y * 0.3 * direction * mix(0.5, 1.0, circularForce);
    angle -= (abs(scrollSpeed) > 0.0001) ? angularVelocity : 0.05;

    // --- Control thickness near bottom ---
    // bottomAngle = -PI/2 ≈ -1.5708
    float bottomAngle = -1.5708;
    // angular distance from bottom (in radians)
    float angleDist = abs(mod(angle - bottomAngle + 3.14159, 6.28318) - 3.14159);
    // smoothstep to create a narrow range near bottom
    float thicknessControl = smoothstep(0.0, 0.7, angleDist);
    // thicknessControl == 0 near bottom (thin), 1 far from bottom (normal thickness)

    // Radius wobble with randomized phase offset, amplitude modulated by thicknessControl
    float wobbleAmplitude = 0.2 * thicknessControl; // reduce wobble near bottom
    float wobble = sin(info.x * 10.0 + time * 0.5 + info.y * 5.0) * wobbleAmplitude;

    float targetRadius = mix(
        info.x,
        4.0,
        0.5 + 0.45 * sin(angle + wobble)
    );

    // Soften toward target radius
    radius += (targetRadius - radius) * mix(0.9, 0.005, circularForce);

    // Project new position
    vec3 targetPos = vec3(cos(angle), sin(angle), 0.0) * radius;

    // Move toward target
    pos.xy += (targetPos.xy - pos.xy) * 0.03 * speedMultiplier;

    // Curl force (still present when idle, but smaller)
    float curlFactor = mix(0.2, 1.0, step(0.0001, abs(scrollSpeed)));
    pos.xy += curl(pos.xyz * 0.7, time * 0.5, 1.0).xy * 0.003 * speedMultiplier * direction * curlFactor;

    gl_FragColor = vec4(pos.xy, 1.0, 1.0);
}






// ---------- ON NO SCROLL, paint brush stroke look
// void main() {
//     vec2 vUv = gl_FragCoord.xy / resolution.xy; // or your varying UV
//     vec4 pos = texture2D(uPositions, vUv);
//     vec4 info = texture2D(uInfo, vUv);

//     float radius = length(pos.xy);
//     float circularForce = 1.0 - smoothstep(10.3, 0.4, abs(pos.x - radius));
//     float direction = sign(scrollSpeed);
//     float speedMultiplier = 1.0 + abs(scrollSpeed) * 10.0;

//     float angle = atan(pos.y, pos.x) - info.y * 0.3 * direction * mix(0.5, 1.0, circularForce);

//     float targetRadius = mix(
//         info.x,
//         3.5,
//         0.5 + 0.45 * sin(angle + time * 0.0002)
//     );

//     radius += (targetRadius - radius) * mix(0.9, 0.05, circularForce);
//     vec3 targetPos = vec3(cos(angle), sin(angle), 0.0) * radius;

//     pos.xy += (targetPos.xy - pos.xy) * 0.03 * speedMultiplier;
//     pos.xy += curl(pos.xyz * 0.7, time * 0.5, 1.0).xy * 0.003 * speedMultiplier * direction;

//     gl_FragColor = vec4(pos.xy, 1.0, 1.0);
// }



// ---------- RED SWARM, BEST SO FAR
// void main() {
//     vec4 pos = texture2D(uPositions, vUv);
//     vec4 info = texture2D(uInfo, vUv);

//     vec2 mouse = uMouse;

//     float radius = length(pos.xy);
//     float circularForce = 1.0 - smoothstep(0.3, 1.4, abs(pos.x - radius));

//     float angle = atan(pos.y, pos.x) - info.y * 0.3 * mix(0.5, 1.0, circularForce);

//     float targetRadius = mix(
//         info.x,
//         3.5,
//         0.5 + 0.45 * sin(angle + time * 0.0002)
//     );

//     radius += (targetRadius - radius) * mix(0.9, 0.05, circularForce);
//     vec3 targetPos = vec3(cos(angle), sin(angle), 0.0) * radius;

//     // 🔄 Rhythmic slowdown but never stop
//     float pauseCycle = sin(time * 0.3 + info.z * 6.28); // unique cycle
//     float pause = smoothstep(0.2, 0.6, pauseCycle);     // soft ease in/out

//     // Clamp motion strength to never go below 0.2
//     float motionStrength = mix(0.2, 1.0, 1.0 - pause);

//     // Apply eased motion
//     pos.xy += (targetPos.xy - pos.xy) * 0.03 * motionStrength;
//     // pos.xyz * MORE RIPPLE, time * WAVY, 0.0 - 1.0 LOOK NATURAL
//     pos.xy += curl(pos.xyz * 0.7, time * 0.1, 1.0).xy * 0.003 * motionStrength;

//     float dist = length(pos.xy - mouse);
//     vec2 dir = normalize(pos.xy - mouse);
//     pos.xy += dir * 0.05 * smoothstep(0.9, 0.0, dist) * motionStrength;

//     // vec2 radialDir = normalize(pos.xy);
//     // pos.xy -= radialDir * 0.01 * (radius - targetRadius) * motionStrength;
//     gl_FragColor = vec4(pos.xy, 1.0, 1.0);
// }


// ---------- SLUG SHAPE
// void main() {
//     vec4 pos = texture2D(uPositions, vUv);
//     vec4 info = texture2D(uInfo, vUv);

//     // vec2 mouse = vec2(sin(time), cos(time));  // Show position of mouse
//     vec2 mouse = uMouse;
    
//     float radius = length(pos.xy);
//     float circularForce = 1. - smoothstep(0.3, 1.4, abs(pos.x - radius));
//     float angle = atan(pos.y, pos.x) - info.y * 0.3 * mix(0.5, 1.0, circularForce);

//     // CIRCULAR LOOP : Controls shape of particles. Ex: flower shape "angle * 5.0"
//     float targetRadius = mix(
//         info.x, 
//         3.0, // wider circle
//         0.5 + 0.45 * sin(angle * 1.0 + time * 0.0002)
//     );

//     radius += (targetRadius - radius) * mix(0.9, 0.05, circularForce);
//     vec3 targetPos = vec3(cos(angle), sin(angle), 0.0) * radius;

//     // Smoothly interpolate position towards the target position
//     pos.xy += (targetPos.xy - pos.xy) * 0.1;

//     // Add curl noise for organic swirling motion
//     pos.xy += curl(pos.xyz * 1.0, time * 0.1, 0.9).xy * 0.006;

//     float dist = length(pos.xy - mouse);
//     vec2 dir = normalize(pos.xy - mouse);
//     pos.xy += dir * 0.1 * smoothstep(0.9, 0.0, dist);

//     gl_FragColor = vec4(pos.xy, 1.0, 1.0);
// }


// Original Circular Loop Simulation
// void main() {
//     vec4 pos = texture2D(uPositions, vUv);
//     vec4 info = texture2D(uInfo, vUv);

//     // vec2 mouse = vec2(sin(time), cos(time));  // Show position of mouse
//     vec2 mouse = uMouse;
    
//     float radius = length(pos.xy);
//     float circularForce = 1. - smoothstep(0.3, 1.4, abs(pos.x - radius));
//     float angle = atan(pos.y, pos.x) - info.y * 0.3 * mix(0.5, 1.0, circularForce);

//     // CIRCULAR LOOP : Controls shape of particles. Ex: flower shape "angle * 5.0"
//     float targetRadius = mix(
//         info.x, 
//         3.0, // wider circle
//         0.5 + 0.45 * sin(angle * 2.0 + time * 0.0002)
//     );

//     radius += (targetRadius - radius) * mix(0.2, 0.5, circularForce);
//     vec3 targetPos = vec3(cos(angle), sin(angle), 0.0) * radius;

//     // Smoothly interpolate position towards the target position
//     pos.xy += (targetPos.xy - pos.xy) * 0.1;

//     // Add curl noise for organic swirling motion
//     pos.xy += curl(pos.xyz * 4.0, time * 0.1, 0.1).xy * 0.006;

//     float dist = length(pos.xy - mouse);
//     vec2 dir = normalize(pos.xy - mouse);
//     pos.xy += dir * 0.1 * smoothstep(0.3, 0.0, dist);

//     gl_FragColor = vec4(pos.xy, 1.0, 1.0);
// }
`;
