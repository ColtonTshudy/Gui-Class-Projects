
let x = 0
let y = 0
let px = 0
let py = 0
let dirX = 1
let easing = 0.1
let angle = 0
let rotationSpeed = 4
let scaleSpeed = .02

function setup(){
    let canvas = createCanvas(500, 500)
    canvas.parent("canvasContainer")
    frameRate(60)
    // ortho(-width / 2, width / 2, height / 2, -height / 2, 0, 500);
   // exploringPers()
    //rectMode(CENTER) // To draw rectangle from middle rather than top left corner.
}

function buildTriangle(){
    fill(0, 0, 50)
    beginShape()
    vertex(0, 0, -1)
    vertex(0, 100, -1)
    vertex(100, 100, -1)
    endShape()
}

function displayBox(){
    stroke(255);
    noFill();
    box(200);
}

function easingExample(){
    let targetX = mouseX
    let targetY = mouseY
    x += (targetX - x) * easing
    y += (targetY - y) * easing
    ellipse(x, 40, 25, 25)
    ellipse(500 - 50, 500 - y, 25, 25)
}

function coolStroke(){
    let targetX = mouseX
    x += (targetX - x) * easing
    let targetY = mouseY
    y += (targetY - y) * easing
    let weight = dist(x, y, px, py)
    strokeWeight(weight)
    line(x, y, px, py)
    px = x
    py = y
}



function tranformation(){
    box()  // build the box at the center
    translate(100, 100,-100) // translate always called to the object after building
    rotateZ(30)
    box()

}

function cameraPanning(){
    camera(mouseX, height/2, (height/2) / tan(PI/6), mouseX, height/2, 0, 0, 1, 0);
    translate(width/2, height/2, -100);
    stroke(255);
    noFill();
    box(200);
}

function exploringPers(){
    let fov = PI/3;
    let cameraZ = (height/2.0) / tan(fov/2.0);
    perspective(fov, float(width)/float(height), cameraZ/10.0, cameraZ*10.0);

}



function exploreTranformation(){
    let tempX = mouseX
    let tempY = mouseY
    x += (tempX - x) * easing
    y += (tempY - y) * easing
    translate(x, y)  // Applies to all drawing functions that follows
    rect(0, 0, 30, 30)
    let weight = dist(x, y, px, py)
    strokeWeight(weight)
    line(x, y, px, py)

    px = x
    py = y
}

function translateScaleThenRot(){
    //push() // To isolate movement put the section into push and pop
    // rotate(angle) // not good approach we keep increasing a number
    // angle += .1
    let angle = (frameCount * rotationSpeed) % 360;
    translate(mouseX, mouseY)
    rotate(radians(angle))
    let scaleFactor = map(sin(frameCount * scaleSpeed), -1, 1, 0.5, 2)
    scale(scaleFactor)
    rect(0, 0, 30, 30)
    //pop()
    translate(35, 10)
    rect(0, 0, 15, 14)

}

function rotateUsingMatrix2D() {
    /**
     * cosx -sinx  0
     * sinx cosx  0
     *  0   0    1
     */
    let angle = (frameCount * 0.01) % 360;

    applyMatrix(cos(angle), sin(angle), -sin(angle), cos(angle), 0, 0)
    rect(0, 0, 30, 30)
}

function translateUsingMatrix2d() {
    /**
     * 1  0  x
     * 0  1  y
     * 0  0  1
     */

    applyMatrix(1, 0, 0, 1, mouseX, mouseY)
    rect(0, 0, 30, 30)
}

function scaleUsingMatrix2d() {
    /**
     * x  0  0
     * 0  y  0
     * 0  0  1
     */

    let scaleFactor = map(sin(frameCount * scaleSpeed), -1, 1, 0.5, 2)
    applyMatrix(scaleFactor, 0, 0, scaleFactor, 0, 0)
    rect(0, 0, 30, 30)
}

function rotThenTrans(){
    rotate(angle)
    translate(mouseX, mouseY)
    rect(0, 0, 10, 10)
    angle += .1
}

function drawEllipse(offset, counter){
    //x += dirX*exp((1 - counter/100))
    let speed = dirX*2.8
    ellipse(speed , offset, 5, 5)
    if (x > width || x < 0){
        dirX *= -1
    }

}

function Box(){
    push()
    translate(100, 0)
    ellipse(5, 5, 10, 10)
    pop()
    translate(10, 10)
    ellipse(5, 5, 10, 10)

}

function draw(){
    background(100)
    //translateScaleThenRot()
    //rotateUsingMatrix2D()
    //translateUsingMatrix2d()
    //scaleUsingMatrix2d()

}
