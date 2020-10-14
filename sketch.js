var ctx, character, character_running, character_collided, back, backImage, ground, invisibleGround, groundImage, obstaclesGroup, obstacle1, obstacle2, gameOver, gameOverImg, restart, restartImg, score = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  character_running = loadAnimation("character2.png", "character4.png");
  character_collided = loadAnimation("characterover.png");

  groundImage = loadImage("ground.png");

  backImage = loadImage("background.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");

  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(950, 550);

  back = createSprite(3600, 250, 3600, 150);
  back.addImage("back", backImage);
  back.x = back.width / 2;
  back.velocityX = -(2 + 3*score/300);

  ground = createSprite(3600, 520, 3600, 95);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 10;
  ground.velocityX = -(4 + 3*score/300);

  character_running.frameDelay = 2;
  character = createSprite(150, 125, 40, 100);
  character.addAnimation("running", character_running);
  character.addAnimation("collide", character_collided);
  character.scale = 0.2;
  character.setCollider("rectangle", 300, 550, 75, 62);

  gameOver = createSprite(475, 250);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;

  restart = createSprite(475, 280);
  restart.addImage(restartImg);
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

  invisibleGround = createSprite(300, 550, 3600, 95);
  invisibleGround.visible = false;

  obstaclesGroup = new Group();

  score = 0;
}

function draw() {

  if (gameState === PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(5 + 3*score/200);

    if(keyDown(" ") && character.y >= 260) {
      character.velocityY = -15;
    }
  character.velocityY = character.velocityY + 1;

    if (ground.x < 0){
      ground.x = ground.width / 10;
    }

    character.collide(invisibleGround);
    spawnObstacles();

    if(obstaclesGroup.isTouching(character)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    ground.velocityX = 0;
    back.velocityX = 0;
    character.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    character.changeAnimation("collided", character_collided);
    obstaclesGroup.setLifetimeEach(-1);

    if(mousePressedOver(restart)) {
      reset();
    }
  }
  drawSprites();
  var show_score = text('SCORE: ' + score, 800, 50);
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(950, 480, 100, 180);
    obstacle.velocityX = -(6 + 3*score/300);

    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
    }

    obstacle.scale = 0.6;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  character.changeAnimation("running", character_running);
  score = 0;
 }
