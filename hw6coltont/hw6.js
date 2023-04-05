/*
 * author: Colton Tshudy
 * version: 04/05/2023
 */

let myShader;

function preload() {
  // load each shader file (don't worry, we will come back to these!)
  myShader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  // the canvas has to be created with WEBGL mode
  createCanvas(400, 400, WEBGL);
  describe('a simple shader example that outputs the color red')
}

function draw() {
  // shader() sets the active shader, which will be applied to what is drawn next
  shader(myShader);
  // apply the shader to a rectangle taking up the full canvas
  rect(0,0,width,height);
}