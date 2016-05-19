
//mouse click or x to flap

var GRAVITY = .3;
var FLAP = -5;
var GROUND_Y = 950;
var MIN_OPENING = 300;
var bird, ground;
var pipes;
var gameOver;
var birdImg, pipeImg, groundImg, bgImg;


function setup() {
  createCanvas(800, 800);

  birdImg = loadImage("assets/flappy_bird.png");

  groundImg = loadImage("assets/flappy_ground.png");
  bgImg = loadImage("assets/flappy_bg.png");
  pipeImg = loadImage("assets/flappy_pipe.png");

  bird = createSprite(width*.5, height*.5, 40, 40);
  bird.rotateToDirection = false;
  bird.velocity.x = 10;
  bird.setCollider("circle", 0, 0, 20);
  bird.addImage(birdImg);

  ground = createSprite(800 / 2, GROUND_Y + 200); //image 800x200
  ground.addImage(groundImg);

  pipes = new Group();
  gameOver = true;
  updateSprites(false);

  camera.position.y = height / 2;
}

function draw() {

  if (gameOver && keyWentDown("x"))
    newGame();

  if (!gameOver) {

    if (keyWentDown("x"))
      bird.velocity.y = FLAP;

    bird.velocity.y += GRAVITY;

    if (bird.position.y < 0)
      bird.position.y = 0;

    if (bird.position.y + bird.height / 2 > GROUND_Y)
      die();

    if (bird.overlap(pipes))
      die();

    //spawn pipes
    if (frameCount % 60 == 0) {
      var pipeH = random(850, 2000);
      var pipe = createSprite(bird.position.x + width, GROUND_Y - pipeH / 2 + 1 + 100, 80, pipeH);
      pipe.addImage(pipeImg);
      pipe.scale= random(0,2);
      pipe.rotate= random(0,360);
      pipes.add(pipe);

      //top pipe
      if (pipeH < 200) {
        pipeH = height - (height - GROUND_Y) - (pipeH + MIN_OPENING);
        pipe = createSprite(bird.position.x + width, pipeH / 2 - 100, 80, pipeH);
        pipe.mirrorY(-1);
        pipe.addImage(pipeImg);
        pipes.add(pipe);
      }
    }

    //get rid of passed pipes
    for (var i = 0; i < pipes.length; i++)
      if (pipes[i].position.x < bird.position.x - width / 2)
        pipes[i].remove();
  }

  camera.position.x = bird.position.x + width / 4;

  //wrap ground
  if (camera.position.x > ground.position.x - ground.width + width / 2)
    ground.position.x += ground.width;

  background(98,105,124);
  camera.off();
  image(bgImg, 0, GROUND_Y - 1090);
  camera.on();

  drawSprites(pipes);
  drawSprite(ground);
  drawSprite(bird);
}

function die() {
  updateSprites(false);
  gameOver = true;
}

function newGame() {
  pipes.removeSprites();
  gameOver = false;
  updateSprites(true);
  bird.position.x = width / 2;
  bird.position.y = height / 2;
  bird.velocity.y = 0;
  ground.position.x = 800 / 2;
  ground.position.y = GROUND_Y + 200;
}

function mousePressed() {
  if (gameOver)
    newGame();
  bird.velocity.y = FLAP;
}
