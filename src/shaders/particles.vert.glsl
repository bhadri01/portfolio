precision highp float;

uniform float uProgress;
uniform float uTime;
uniform float uPixelRatio;

attribute vec2 aUv;   // uv into the portrait texture
attribute float aRnd; // per-particle random 0..1

varying vec2 vUv;
varying float vAlpha;

// cheap flow field for curved drift
vec3 flow(vec3 p, float t) {
  return vec3(
    sin(p.y * 1.5 + t) + cos(p.z * 1.2 - t),
    cos(p.x * 1.3 + t) + sin(p.z * 1.1 + t),
    sin(p.x * 1.1 - t) + cos(p.y * 1.4 + t)
  );
}

void main() {
  vUv = aUv;

  // staggered disintegration across 0.5 -> ~0.9 of the story
  float start = 0.5 + aRnd * 0.12;
  float d = smoothstep(start, start + 0.35, uProgress);

  vec3 pos = position;
  vec3 dir = normalize(vec3((aUv - 0.5) * 2.0, -0.6)); // outward in xy, back in -z
  pos += dir * d * (1.1 + aRnd * 1.8);
  pos += flow(position * 1.5, uTime * 0.3 + aRnd * 6.28) * d * 0.22;

  vAlpha = d;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = (1.6 + aRnd * 2.6) * uPixelRatio * (260.0 / -mv.z);
}
