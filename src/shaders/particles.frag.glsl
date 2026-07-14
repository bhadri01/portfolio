precision highp float;

uniform sampler2D uTex;

varying vec2 vUv;
varying float vAlpha;

void main() {
  // round soft point
  vec2 c = gl_PointCoord - 0.5;
  float r = dot(c, c);
  if (r > 0.25) discard;

  vec4 col = texture2D(uTex, vUv);
  // tint toward electric blue as fragments detach
  vec3 tint = mix(col.rgb, vec3(0.18, 0.42, 1.0), 0.55);
  float soft = smoothstep(0.25, 0.0, r);
  gl_FragColor = vec4(tint, col.a * vAlpha * soft);
}
