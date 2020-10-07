class Obstacle {
  
  constructor() {
    this.r = 50;
    this.x = width;
    this.y = height - 1.1*this.r;
  }
  
  setSpeed(speed) {
    this.speed = speed;
  }  
  
  getX() {
    return this.x;
  }
    
  move() {
    this.x -= 12;
  }
  
  show() {
    image(oImg, this.x, this.y, this.r, this.r);
    //fill(255,50);
    //ellipseMode(CORNER);
    //ellipse(this.x, this.y, this.r, this.r);
  }
}