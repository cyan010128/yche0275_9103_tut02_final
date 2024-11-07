let cloudImage;
let birdMask;
let angle = 0; // Initial rotation angle
let isRotate = false;
let x;
let y;
let nb = 80;
let grasses = [];

let noiseArray = [];
let totalRays = 90;
let angleStep = 360.0 / totalRays;
let organicMode = true;

function preload() {
  cloudImage = loadImage("./images/clouds.jpg"); // Load the cloud image
}

function setup() {
  createCanvas(800, 600);
  x = 800;
  y = 100;

  for (let i = 0; i < nb; i++) {
    grasses[i] = new Grass(random(width), height);
  }
  noiseArray = Array(totalRays)
    .fill()
    .map(() => random(1000));

  // Create a graphics object to draw the bird shape for masking
  birdMask = createGraphics(width, height);

  drawDove(birdMask); // Draw the bird shape on the mask
  cloudImage.mask(birdMask); // Apply the bird shape as a mask on the cloud image
}

function draw() {
  background(0, 100, 200); // Set background color
  organicSun();
  // Display the masked cloud image, so it appears in the shape of the bird
  let centerX = width / 2;
  let centerY = height / 2;

  push();
  // translate the canvas to the center
  translate(centerX, centerY);
  // rotate the image
  rotate(angle);
  // Display the masked cloud image, so it appears in the shape of the bird
  imageMode(CENTER);
  image(cloudImage, x, y, width, height);

  pop();

  moveDove();

  for (let i = 0; i < grasses.length; i++) {
    grasses[i].update();
    let d = 60 / Math.ceil(abs(mouseX - grasses[i].pos[0].x));
    grasses[i].setWind((mouseX - pmouseX) * d);
    grasses[i].display();
  }
}

function organicSun() {
  fill(223, 174, 39);
  noStroke();

  push();
  translate(150, 150);
  let constRad = 20;

  beginShape();
  for (let x = 0; x < totalRays; x++) {
    let rad = constRad + noise(noiseArray[x]) * 100;
    let startX = 0;
    let startY = 0;
    let endX = startX + rad * sin(radians(x * angleStep));
    let endY = startY + rad * cos(radians(x * angleStep));
    vertex(endX, endY);
    noiseArray[x] += 0.007;
  }
  endShape(CLOSE);

  fill(255, 215, 13);
  ellipse(0, 0, 100, 100);
  pop();
}

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

  if (x < -width / 2) {
    x = width + width / 2;
    y = 100;
    isRotate = false;
    angle = 0;
  }
}

function drawDove(pg) {
  pg.fill(255); // Fill white for the mask

  pg.noStroke();

  pg.beginShape();

  // Pigeon's head
  pg.vertex(200, 150);
  pg.bezierVertex(172, 141, 160, 74, 73, 3); // top wings
  pg.bezierVertex(155, 188, 109, 98, 82, 152); // head curve
  pg.bezierVertex(137, 126, 105, 144, 70, 149); // oral curve
  // Neck of the pigeon
  pg.bezierVertex(135, 166, 98, 196, 166, 244); // Neck Curve

  // Body and tail of the pigeon
  pg.bezierVertex(169, 246, 238, 282, 198, 260); // body curve
  pg.bezierVertex(332, 396, 392, 292, 249, 250); // Tail curve
  pg.bezierVertex(231, 200, 305, 260, 343, 160); // Tail curve

  // Pigeon's Wings
  pg.bezierVertex(241, 274, 339, 195, 391, 89); // wing curve
  pg.bezierVertex(322, 96, 487, 89, 291, 74); // wing curve
  pg.bezierVertex(212, 57, 164, 165, 197, 155); // Wings back to the head

  pg.endShape(CLOSE);

  pg.beginShape();
  pg.vertex(239, 296);
  pg.vertex(294, 268);
  pg.vertex(357, 307);
  pg.vertex(284, 345);
  pg.endShape(CLOSE);
}

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
    this.pos = [];
    for (let i = 0; i < this.segNum; i++)
      this.pos[i] = createVector(p_x, p_y - i * this.SEG_DIST);
  }

  update() {
    this.rootNoise.add(createVector(0.02, 0.02));

    for (let i = 1; i < this.pos.length; i++) {
      let n = noise(
        this.rootNoise.x + 0.003 * this.pos[i].x,
        this.rootNoise.y + 0.003 * this.pos[i].y
      );
      let noiseForce = (0.3 - n) * i * 0.1;
      this.pos[i].x += noiseForce;

      let windforce = p5.Vector.mult(
        this.wind,
        pow(map(i, 1, this.pos.length, 0, 1), 3)
      );
      this.pos[i].add(windforce);
      this.pos[i].y -= this.FLOTATION;

      let tmp = p5.Vector.sub(this.pos[i], this.pos[i - 1])
        .normalize()
        .mult(this.SEG_DIST);
      this.pos[i] = p5.Vector.add(this.pos[i - 1], tmp);
    }
  }

  setWind(vx) {
    let input = p5.Vector.sub(createVector(vx, 0), this.wind).mult(0.1);
    this.wind.add(input);
  }

  display() {
    for (let i = 0; i < this.pos.length - 1; i++) {
      noFill();
      stroke(this.col);
      strokeWeight(map(i, 0, this.pos.length - 1, this.pos.length / 5, 1));
      line(this.pos[i].x, this.pos[i].y, this.pos[i + 1].x, this.pos[i + 1].y);
    }
  }
}
