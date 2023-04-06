/*
 * author: Colton Tshudy
 * version: 04/06/2023
 */

// Gear canvas
const gear_sketch = ( sketch ) => {
  sketch.preload = () =>{
    gearShader = sketch.loadShader('shader.vert', 'gear-shader.frag');
    slider = document.getElementById("gear-slider");
    body = document.body;
  }

  sketch.setup = () => {
    sketch.pixelDensity(1);
    let canvasGear = sketch.createCanvas(400/window.devicePixelRatio, 400/window.devicePixelRatio, sketch.WEBGL);
    canvasGear.parent('gear-holder');
    t = 0
  };

  sketch.draw = () => {
    sketch.shader(gearShader)
    gearShader.setUniform("u_time",t)
    gearShader.setUniform("u_resolution",[sketch.width, sketch.width])
    gearShader.setUniform("u_teeth", slider.value)
    sketch.circle(0,sketch.width,sketch.height)
    t++
  };
};

// Background canvas
const bg_sketch = ( sketch ) => {
  sketch.preload = () =>{
    shaderBg = sketch.loadShader('shader.vert', 'bg-shader.frag');
    body = document.body;
  }

  sketch.setup = () => {
    let canvasBg = sketch.createCanvas(body.clientWidth, body.clientHeight, sketch.WEBGL);
    canvasBg.parent('bg-holder');
    t = 0
  };

  sketch.draw = () => {
    sketch.shader(shaderBg)
    shaderBg.setUniform("u_time",t)
    sketch.rect(0,0,sketch.width,sketch.height)
    t++
  };
};

// Onload, occurs once
function onload(){
  let gear = new p5(gear_sketch)
  let bg = new p5(bg_sketch)
  addEventListener("resize", () => { windowResized(bg) })
}

// Occurs every time the window is resized
function windowResized(bg) {
  bg.resizeCanvas(body.clientWidth, body.clientHeight)
}

function updateSliderCount() {
  const a = document.getElementById("numbah");
  a.innerHTML = slider.value
}