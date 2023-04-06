/*
 * author: Colton Tshudy
 * version: 04/05/2023
 */


let myShader;

function preload() {
  gearShader = loadShader('gear-shader.vert', 'gear-shader.frag');
  slider = document.getElementById("gear-slider");
}

function setup() {
  var canvas = createCanvas(400, 400, WEBGL);
  canvas.parent('sketch-holder');
  t = 0
  
}

function draw() {
  shader(gearShader)
  gearShader.setUniform("u_time",t)
  gearShader.setUniform("u_resolution",[width, height])
  gearShader.setUniform("u_teeth", slider.value)
  rect(0,0,width,height)
  t++
}