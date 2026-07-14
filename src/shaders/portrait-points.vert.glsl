precision highp float;

uniform sampler2D uTex;
uniform float uProgress; // 0 (assembled) -> 1 (fully dissolved)
uniform float uTime;
uniform float uSize;

attribute vec2 aUv;
attribute float aRnd;

varying vec3 vColor;
varying float vAlpha;

vec3 hash3(float n) {
  return fract(sin(vec3(n, n + 1.0, n + 2.0)) * vec3(43758.5453, 22578.145, 19642.3)) * 2.0 - 1.0;
}

void main() {
  vColor = texture2D(uTex, aUv).rgb;

  // staggered start so the dissolve sweeps across the portrait
  float startT = aRnd * 0.42 + aUv.x * 0.12;
  float lp = smoothstep(startT, startT + 0.55, uProgress);

  vec3 dir = hash3(aRnd * 91.7);
  dir.z = abs(dir.z) * 1.1 + 0.35; // push toward the camera as it breaks up

  vec3 disp = position;
  disp += dir * lp * 2.6;
  disp.y += sin(uTime * 0.6 + aRnd * 6.2831) * lp * 0.28;
  disp.x += cos(uTime * 0.5 + aRnd * 6.2831) * lp * 0.22;

  vec4 mv = modelViewMatrix * vec4(disp, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * (1.0 + lp * 2.2) * (300.0 / -mv.z);

  vAlpha = 1.0 - smoothstep(0.62, 1.0, uProgress * 0.8 + aRnd * 0.28);
}
