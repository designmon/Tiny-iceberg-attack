class Character {
  constructor() {
    this.r = 250;
    this.x = 50;
    this.y = height - this.r;
    //this is for velocity to jump
    this.vy = 50;
    //gravity so when it jumps it comes back down
    this.gravity = 2;
  }
  
  jump() {
    //so he only jumps once every time!
    if (this.y == height - this.r) {
      //how high it jumps
      this.vy = -28;
    }
  }
  
  hits(obstacle) {
    
    let x1 = this.x + this.r * 0.5;
    let y1 = this.y + this.r * 0.5;
    let x2 = obstacle.x + obstacle.r * 0.5;
    let y2 = obstacle.y + obstacle.r * 0.5;
    
    return collideCircleCircle(x1, y1, this.r-107, x2, y2, obstacle.r);
    
  }
  
  move() {
    this.y += this.vy;
    this.vy += this.gravity;
    this.y = constrain(this.y, 0, height - this.r);
  }
  
  show() {
    image(cImg, this.x, this.y, this.r-120, this.r);
    //fill(255, 50);
    //ellipseMode(CORNER);
    //ellipse(this.x, this.y, this.r-80, this.r);
  }
  
} 