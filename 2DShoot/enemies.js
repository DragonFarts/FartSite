class Shape {
    constructor(x, y, type, size, angle = 0, angleSpan = 360, velX = 0, velY = shapeSpeed) {
      this.x = x;
      this.y = y;
      this.type = type;
      this.size = size;
      this.angle = angle;
      this.angleSpan = angleSpan;
      this.velX = velX;
      this.velY = velY;
      this.color = color(random(255), random(255), random(255));
      this.isFragment = false;
    }
  
    display() {
      fill(this.color);
      arc(this.x, this.y, this.size, this.size, radians(this.angle), radians(this.angle + this.angleSpan));
    }
  
    update() {
      this.x += this.velX;
      this.y += this.velY;
    }
  
    createFragments() {
      const fragments = [];
  
      if (!this.isFragment) {
        const numSlices = floor(random(2, 9));
        for (let i = 0; i < numSlices; i++) {
          const angle = i * (360 / numSlices);
          const angleSpan = 360 / numSlices;
          const velX = random(-2, 2);
          const velY = random(-2, 2);
          const fragment = new Shape(this.x, this.y, this.type, this.size, angle, angleSpan, velX, velY);
          fragment.isFragment = true;
          fragments.push(fragment);
        }
      }
  
      return fragments;
    }
  }
  