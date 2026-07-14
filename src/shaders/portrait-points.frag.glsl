precision highp float;

varying vec3 vColor;
varying float vAlpha;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = dot(c, c);
  if (d > 0.25) discard;           // clip to a soft disc
  float edge = smoothstep(0.25, 0.10, d);
  gl_FragColor = vec4(vColor, vAlpha * edge);
}
