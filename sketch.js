let cloudImage;
let birdMask;
let angle = 0; // Initial rotation angle for cloud movement
let isRotate = false; // Rotation state of the cloud bird
let x; // X position for the cloud bird
let y; // Y position for the cloud bird
let nb = 80; // Number of grass blades
let grasses = []; // Array to hold grass blade objects
let noiseArray = []; // Array to hold noise values for sun rays
let totalRays = 90; // Number of rays for the organic sun
let angleStep = 360.0 / totalRays; // Angle step for each ray
let organicMode = true; // Toggle organic mode

function preload() {
    // Load the cloud image for the bird shape
    cloudImage = loadImage("./images/clouds.jpg");
}

function setup() {
    createCanvas(800, 600);
    x = 800; // Initial x position of cloud bird
    y = 100; // Initial y position of cloud bird

    // Populate grasses array with Grass objects
    for (let i = 0; i < nb; i++) {
        grasses[i] = new Grass(random(width), height);
    }

    // Initialize noise array for sun rays with random values
    noiseArray = Array(totalRays).fill().map(() => random(1000));

    // Create a graphics object to draw the bird shape for masking
    birdMask = createGraphics(width, height);
    drawDove(birdMask); // Draw the bird shape on the mask
    cloudImage.mask(birdMask); // Apply the bird shape as a mask on the cloud image
}

function draw() {
    background(0, 100, 200); // Set sky background color
    organicSun(); // Draw the sun with animated rays

    // Display the masked cloud image in bird shape, rotating around the center
    let centerX = width / 2;
    let centerY = height / 2;
    push();
    translate(centerX, centerY);
    rotate(angle);
    imageMode(CENTER);
    image(cloudImage, x, y, width, height);
    pop();

    // Update position and rotation for the dove-shaped cloud
    moveDove();

    // Update and display each grass blade in response to mouse movement
    for (let i = 0; i < grasses.length; i++) {
        grasses[i].update();
        let d = 60 / Math.ceil(abs(mouseX - grasses[i].pos[0].x));
        grasses[i].setWind((mouseX - pmouseX) * d);
        grasses[i].display();
    }
}

// Function to draw the organic sun with animated rays using Perlin noise
function organicSun() {
    fill(223, 174, 39); // Base color for sun rays
    noStroke();
    push();
    translate(150, 150); // Position the sun

    let constRad = 20; // Base radius of sun

    // Draw the sun rays using Perlin noise for organic shapes
    beginShape();
    for (let x = 0; x < totalRays; x++) {
        let rad = constRad + noise(noiseArray[x]) * 100;
        let endX = rad * sin(radians(x * angleStep));
        let endY = rad * cos(radians(x * angleStep));
        vertex(endX, endY);
        noiseArray[x] += 0.007;
    }
    endShape(CLOSE);

    fill(255, 215, 13); // Color for sun core
    ellipse(0, 0, 100, 100); // Draw sun core
    pop();
}

// Function to control movement of the dove-shaped cloud bird
function moveDove() {
    if (isRotate) {
        angle -= 0.05;
        x -= 0.1;
        y -= 0.1;
        if (angle <= -6.2) {
            angle = 0;
            isRotate = false;
        }
    } else {
        x -= 2;
        if (x == 300) {
            isRotate = true;
        }
    }
    // Reset position if cloud bird moves off screen
    if (x < -width / 2) {
        x = width + width / 2;
        y = 100;
        isRotate = false;
        angle = 0;
    }
}

// Function to draw a dove shape for the cloud masking effect
function drawDove(pg) {
    pg.fill(255); // Fill white for the mask
    pg.noStroke();
    pg.beginShape();

    // Define the dove shape with bezier vertices
    pg.vertex(200, 150);
    pg.bezierVertex(172, 141, 160, 74, 73, 3);
    pg.bezierVertex(155, 188, 109, 98, 82, 152);
    pg.bezierVertex(137, 126, 105, 144, 70, 149);
    pg.bezierVertex(135, 166, 98, 196, 166, 244);
    pg.bezierVertex(169, 246, 238, 282, 198, 260);
    pg.bezierVertex(332, 396, 392, 292, 249, 250);
    pg.bezierVertex(231, 200, 305, 260, 343, 160);
    pg.bezierVertex(241, 274, 339, 195, 391, 89);
    pg.bezierVertex(322, 96, 487, 89, 291, 74);
    pg.bezierVertex(212, 57, 164, 165, 197, 155);
    pg.endShape(CLOSE);

    // Draw additional wing details
    pg.beginShape();
    pg.vertex(239, 296);
    pg.vertex(294, 268);
    pg.vertex(357, 307);
    pg.vertex(284, 345);
    pg.endShape(CLOSE);
}

// Grass class to create and animate individual blades of grass
class Grass {
    constructor(p_x, p_y) {
        this.FLOTATION = random(5, 8);
        this.SEG_DIST = 5;
        this.maxNbSeg = 50;
        this.minNbSeg = 20;
        this.segNum = Math.floor(random(this.minNbSeg, this.maxNbSeg));
        this.rootNoise = createVector(random(23333), random(23333));
        this.col = color(0, random(120, 210), random(20, 50));
        this.wind = createVector(0, 0);
        this.pos = Array.from({ length: this.segNum }, (_, i) => createVector(p_x, p_y - i * this.SEG_DIST));
    }

    // Update grass position with noise for organic movement
update() {
  this.rootNoise.add(createVector(0.02, 0.02));
  for (let i = 1; i < this.pos.length; i++) {
  let n = noise(this.rootNoise.x + 0.003 * this.pos[i].x, this.rootNoise.y + 0.003 * this.pos[i].y);
   let noiseForce = (0.3 - n) * i * 0.1;
   this.pos[i].x += noiseForce;

  let windforce = p5.Vector.mult(this.wind, pow(map(i, 1, this.pos.length, 0, 1), 3));
  this.pos[i].add(windforce);
  this.pos[i].y -= this.FLOTATION;

  let tmp = p5.Vector.sub(this.pos[i], this.pos[i - 1]).normalize().mult(this.SEG_DIST);
  this.pos[i] = p5.Vector.add(this.pos[i - 1], tmp);
     }
    }

    // Set wind force based on mouse movement
    setWind(vx) {
        let input = p5.Vector.sub(createVector(vx, 0), this.wind).mult(0.1);
        this.wind.add(input);
    }

    // Display the grass blades
  display() {
  for (let i = 0; i < this.pos.length - 1; i++) {
  noFill();
  stroke(this.col);
  strokeWeight(map(i, 0, this.pos.length - 1, this.pos.length / 5, 1));
  line(this.pos[i].x, this.pos[i].y, this.pos[i + 1].x, this.pos[i + 1].y);
        }
    }
}
