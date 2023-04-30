const playerSpeed = 5;
const bulletSpeed = 10;
const shapeSpeed = 2;
const shapeSize = 50;

let player;
let bullets = [];
let shapes = [];
let score = 0;

let currentWeapon = 1;
let ammo = 1080;

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height * 0.8;
    this.size = 30;
  }

  display() {
    triangle(this.x, this.y - this.size / 2, this.x - this.size / 2, this.y + this.size / 2, this.x + this.size / 2, this.y + this.size / 2);
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
    this.x = constrain(this.x, this.size / 2, width - this.size / 2);
    this.y = constrain(this.y, this.size / 2, height - this.size / 2);
  }
}

function setup() {
  createCanvas(800, 600);
  player = new Player();
}

function draw() {
  background(0);
  handleInput();
  updateGame();
  displayGame();
}

function updateGame() {
    player.update && player.update();
  
    bullets.forEach((bullet, i) => {
      bullet.update();
      if (bullet.y < 0) {
        bullets.splice(i, 1);
      } else {
        shapes.forEach((shape, j) => {
          if (shapeCollision(bullet, shape)) {
            if (!shape.isFragment) {
              score += shape.type === 'circle' ? 10 : 5;
              shapes.splice(j, 1);
              bullets.splice(i, 1);
              shapes.push(...shape.createFragments());
            } else {
              score += 5;
              shapes.splice(j, 1);
              bullets.splice(i, 1);
            }
          }
        });
      }
    });
  
    shapes.forEach((shape, i) => {
      shape.update();
      if (shape.y > height + shape.size) {
        shapes.splice(i, 1);
      }
    });
  
    if (frameCount % 60 === 0) {
      const type = random(['triangle', 'square', 'circle', 'pentagon', 'hexagon']);
      const xPos = random(shapeSize / 2, width - shapeSize / 2);
      shapes.push(new Shape(xPos, -shapeSize / 2, type, shapeSize));
    }
  }
  
  function shapeCollision(bullet, shape) {
    const anglePerSlice = 360 / shape.angleSpan;
    const distance = dist(bullet.x, bullet.y, shape.x, shape.y);
  
    if (distance < shape.size / 2 + bullet.size / 2) {
      const angle = atan2(bullet.y - shape.y, bullet.x - shape.x);
      const angleDeg = degrees(angle);
      const adjustedAngle = (angleDeg - shape.angle + 360) % 360;
  
      if (adjustedAngle <= shape.angleSpan) {
        return true;
      }
    }
    return false;
  }
  

function displayGame() {
  player.display();

  bullets.forEach((bullet) => {
    bullet.display();
  });

  shapes.forEach((shape) => {
    shape.display();
  });

  displayUI();
}
