precision mediump float;

uniform float u_time;
varying vec2 vectorCoord;

void main() {
  // now because of the varying vTexCoord, we can access the current texture coordinate
  vec3 color = vec3(vectorCoord.x+vectorCoord.y-0.5, 0, vectorCoord.x/1.5);

  // and now these coordinates are assigned to the color output of the shader
  gl_FragColor = vec4(color,1.0);
}