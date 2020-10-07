let character;
let cImg;
let oImg;
let bImg;
let obstacles = [];
let score = 0;
let minScore = 0;

function preload(){
  cImg = loadImage("character2.png");
  oImg = loadImage("obstacle.png");
  bImg = loadImage("background.png");
}

function setup() {
  createCanvas(950, 550);
  character = new Character();
  score = 0;
}

function keyPressed() {
  if (key == ' ') {
    character.jump();
  }
}

function draw() {
  
  background(bImg); 
  text("SCORE: " + round(score), 850, 50);
  textSize(14);
  fill(255, 255, 255);
  
  score += 0.05;
  
  character.show();
  character.move();
  
  if (random(1) < 0.01) {
    if (score > minScore) {
      obstacles.push(new Obstacle());
      minScore = score + 2 + random(1);
    }
  }
  
  for (o of obstacles) {
    o.setSpeed(8 + sqrt(score)/5);
    print(8 + sqrt(score)/5);
    o.move();
    o.show();
    
    if (character.hits(o)) {
      console.log("Game over!");
      noLoop();
    }

    if (o.getX() < 0) {
      obstacles.shift(); 
      print("removed");
    }
  }
}