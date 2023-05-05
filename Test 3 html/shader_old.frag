#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
varying vec2 vectorCoord;

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;

  st *= 3.0;
  st = fract(st);
  st -= 0.5;

  // Your code here
  float pi = 3.1415926535897932384626433832795;

  float aspectRatio = u_resolution.x / u_resolution.y;
  float h = 1.0;
  float w = aspectRatio;

  float spacingX = w / 3.0 + 1.0;
  float spacingY = h / 3.0 + 1.0;

  float x = 0.0;
  float y = 0.0;

  float encloseR = 0.04;

  vec2 uv = vec2(gl_FragCoord.x / u_resolution.x * aspectRatio, gl_FragCoord.y / u_resolution.y);

  for (float i = 0.0; i < 3.; i++) {
    for (float j = 0.0; j < 3.; j++) { 
      vec2 center = vec2(spacingX * (i + 1.0), spacingY * (j + 1.0));
      float theta = pi * 2.0;

      x = center.x + cos(theta) * encloseR;
      y = center.y + sin(theta) * encloseR;

      vec2 encloser = vec2(x,y);
      if (length(uv - encloser) < encloserRadius) {
        gl_FragColor = vec4(uv,1.0,1.0);
        return;
      }
  }

  vec3 color = vec3(vectorCoord.x+vectorCoord.y-0.5, 0, vectorCoord.x/1.5);
  gl_FragColor = vec4(color,1.0);
}