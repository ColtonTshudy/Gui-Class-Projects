/*
 * author: Colton Tshudy
 * version: 04/07/2023
 */

// Canvas
const Sketch = (sketch) => {
    sketch.preload = () => {
        shader = sketch.loadShader('shader.vert', 'shader.frag');
        body = document.body;
    }

    sketch.setup = () => {
        let canvas = sketch.createCanvas(400, 400, sketch.WEBGL);
        canvas.parent('canvas');
        t = 0
    };

    sketch.draw = () => {
        sketch.shader(shader)
        // gearShader.setUniform("u_time", t)
        shader.setUniform("u_resolution", [sketch.width * sketch.pixelDensity(), sketch.width * sketch.pixelDensity()])
        // gearShader.setUniform("u_teeth", slider.value)
        sketch.rect(0, 0, sketch.width, sketch.height)
        t++
    };
};

// Onload, occurs once
function onload() {
    let gear = new p5(Sketch)
}