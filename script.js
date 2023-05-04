//きれいな幾何図形がうごく
let shapes = [];
let numShapes = 80;
let minRadius = 10;
let maxRadius = 120;

function setup() {
  createCanvas(2000, 1200);
  for (let i = 0; i < numShapes; i++) {
    let shapeType = floor(random(6));
    let shape;
    if (shapeType === 0) {
      shape = new Circle();
    } else if (shapeType === 1) {
      shape = new Square();
    } else if (shapeType === 2) {
      shape = new Triangle();
    } else if (shapeType === 3) {
      shape = new Star();
    } else {
      shape = new Heart();
    }
    shape.init();
    shapes.push(shape);
  }
}

function draw() {
  background(20, 20, 20);
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].update();
    shapes[i].display();
  }
}

class Shape {
  constructor() {
    this.pos = createVector();
    this.vel = createVector();
    this.radius = 0;
    this.color = color(255);
  }

  init() {
    this.pos.x = random(width);
    this.pos.y = random(height);
    this.vel.x = random(-3, 3);
    this.vel.y = random(-3, 3);
    this.radius = random(minRadius, maxRadius);
    this.color = color(random(255), random(255), random(255));
  }

  update() {
    this.pos.add(this.vel);
    if (this.pos.x < -this.radius || this.pos.x > width + this.radius) {
      this.vel.x *= -1;
    }
    if (this.pos.y < -this.radius || this.pos.y > height + this.radius) {
      this.vel.y *= -1;
    }
  }

  display() { }
}

class Circle extends Shape {
  display() {
    noStroke();
    fill(red(this.color), green(this.color), blue(this.color), 100);
    ellipse(this.pos.x, this.pos.y, this.radius * 2);
    strokeWeight(2);
    stroke(255);
    noFill();
    ellipse(this.pos.x, this.pos.y, this.radius * 1.5);
  }
}

class Square extends Shape {
  display() {
    noStroke();
    fill(red(this.color), green(this.color), blue(this.color), 100);
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
    strokeWeight(2);
    stroke(255);
    noFill();
    rect(this.pos.x, this.pos.y, this.radius * 1.5, this.radius * 1.5);
  }
}

class Triangle extends Shape {
  display() {
    noStroke();
    fill(red(this.color), green(this.color), blue(this.color), 100);
    triangle(this.pos.x, this.pos.y - this.radius,
      this.pos.x - this.radius, this.pos.y + this.radius,
      this.pos.x + this.radius, this.pos.y + this.radius);
    strokeWeight(2);
    stroke(255);
    noFill();
    triangle(this.pos.x, this.pos.y - this.radius * 0.75,
      this.pos.x - this.radius * 0.75, this.pos.y + this.radius * 0.75,
      this.pos.x + this.radius * 0.75, this.pos.y + this.radius * 0.75);
  }
}

class Star extends Shape {
  display() {
    noStroke();
    fill(red(this.color), green(this.color), blue(this.color), 100);
    push();
    translate(this.pos.x, this.pos.y);
    beginShape();
    const numPoints = 5;
    const angle = TWO_PI / numPoints;
    const halfAngle = angle / 2.0;
    const outerRadius = this.radius;
    const innerRadius = this.radius * 0.5;
    for (let i = 0; i < TWO_PI; i += angle) {
      const x = outerRadius * cos(i);
      const y = outerRadius * sin(i);
      vertex(x, y);
      const x2 = innerRadius * cos(i + halfAngle);
      const y2 = innerRadius * sin(i + halfAngle);
      vertex(x2, y2);
      strokeWeight(2);
      stroke(255);
    }
    endShape(CLOSE);
    pop();
  }
}

class Heart extends Shape {
  display() {
    noStroke();
    fill(red(this.color), green(this.color), blue(this.color), 100);
    beginShape();
    vertex(this.pos.x, this.pos.y + this.radius / 4);
    bezierVertex(
      this.pos.x + this.radius / 2,
      this.pos.y - this.radius / 2 + this.radius / 3,
      this.pos.x + this.radius / 4,
      this.pos.y - this.radius + this.radius / 3,
      this.pos.x,
      this.pos.y - this.radius / 4
    );
    bezierVertex(
      this.pos.x - this.radius / 4,
      this.pos.y - this.radius + this.radius / 3,
      this.pos.x - this.radius / 2,
      this.pos.y - this.radius / 2 + this.radius / 3,
      this.pos.x,
      this.pos.y + this.radius / 4
    );
    endShape(CLOSE);
    stroke(255);
    strokeWeight(2);
    noFill();
    beginShape();
    vertex(this.pos.x, this.pos.y + this.radius / 4);
    bezierVertex(
      this.pos.x + this.radius / 2,
      this.pos.y - this.radius / 2 + this.radius / 3,
      this.pos.x + this.radius / 4,
      this.pos.y - this.radius + this.radius / 3,
      this.pos.x,
      this.pos.y - this.radius / 4
    );
    bezierVertex(
      this.pos.x - this.radius / 4,
      this.pos.y - this.radius + this.radius / 3,
      this.pos.x - this.radius / 2,
      this.pos.y - this.radius / 2 + this.radius / 3,
      this.pos.x,
      this.pos.y + this.radius / 4
    );
    endShape();
  }
}
