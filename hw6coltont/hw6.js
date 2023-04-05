/*
 * author: Colton Tshudy
 * version: 04/05/2023
 */

let myShader;

function preload() {
  myShader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  createCanvas(400, 400, WEBGL);
  t = 0
}

function draw() {
  shader(myShader)
  myShader.setUniform("u_time",t)
  myShader.setUniform("u_resolution",[width, height])
  rect(0,0,width,height)
  t++
}