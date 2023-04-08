/*
 * author: Colton Tshudy
 * version: 04/07/2023
 */

function setup(){
    let canvas = createCanvas(300, 300)
    canvas.parent("canvasContainer")
}

function draw(){
    background(100)
    translate(mouseX-10, mouseY-10)
    rect(0, 0, 20, 20)
}