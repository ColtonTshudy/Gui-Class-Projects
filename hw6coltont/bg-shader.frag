// Colton Tshudy
// 04/06/2023

precision mediump float;

varying vec2 vectorCoord;

void main() {
  vec3 color = vec3(vectorCoord.x+vectorCoord.y-0.5, 0, vectorCoord.x/1.5);
  gl_FragColor = vec4(color,1.0);
}