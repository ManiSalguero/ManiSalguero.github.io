
var GRAVITY = 0;
var FLAP = 0;
var GROUND_Y = 950;
var MIN_OPENING = 300;
var nave, ground;
var mets;

var gameOver;

var naveImg, metImg, groundImg, bgImg;


function setup() {
  createCanvas(800, 800);

  naveImg = loadImage("assets/flappy_bird.png");

  groundImg = loadImage("assets/flappy_ground.png");
  bgImg = loadImage("assets/flappy_bg.png");
  metImg = loadImage("assets/flappy_pipe.png");

  nave = createSprite(width*.5, height*.5, 40, 40);
  nave.rotateToDirection = false;
  
  nave.velocity.x = 10;
  
  meteoro.setCollider("circle", 0, 0, 10);
  meteoro.addImage(naveImg);

  ground = createSprite(800 / 2, GROUND_Y + 200); //image 800x200
  ground.addImage(groundImg);

  mets = new Group();
  gameOver = true;
  updateSprites(false);

  camera.position.y = height / 2;
}

function draw() {

  if (gameOver && keyWentDown("x"))
    newGame();

  if (!gameOver) {

    if (keyWentDown("x"))
      nave.velocity.y = mouseY;

    nave.velocity.y += GRAVITY;

    
      nave.position.y = mouseY;

    if (nave.position.y + nave.height / 2 > GROUND_Y)
      die();

    if (nave.overlap(mets))
      die();



    //spawn mets
    if (frameCount % 60 == 0) {
      var metH = random(850, 2000);
      var met = createSprite(nave.position.x + width, GROUND_Y - metH / 2 + 1 + 100, 80, metH);
      met.addImage(metImg);
      met.scale= random(0,1.5);
      met.duplicate
      met.velocity.x=random(2,10);
      met.rotate= random(0,360);
      mets.add(met);

      //top pipe
      if (metH < 200) {
        metH = height - (height - GROUND_Y) - (metH + MIN_OPENING);
        met = createSprite(nave.position.x + width, metH / 2 - 100, 80, metH);
        met.mirrorY(-1);
        met.addImage(metImg);
        mets.add(met);
      }
    }

    //get rid of passed mets
    for (var i = 0; i < mets.length; i++)
      if (mets[i].position.x < nave.position.x - width / 2)
        mets[i].remove();
  }

  camera.position.x = nave.position.x + width / 4;

  //wrap ground
  if (camera.position.x > ground.position.x - ground.width + width / 2)
    ground.position.x += ground.width;

  background(98,105,124);
  camera.off();
  image(bgImg, 0, GROUND_Y - 1090);
  camera.on();

  drawSprites(mets);
  drawSprite(ground);
  drawSprite(nave);
 
}

function die() {
  updateSprites(false);
  gameOver = true;
  
  
}

function newGame() {
  mets.removeSprites();
  gameOver = false;
  updateSprites(true);
  nave.position.x = mouseX;
  nave.position.y = mouseY;
  nave.velocity.y = 0;
  ground.position.x = 800 / 2;
  ground.position.y = GROUND_Y + 200;
}

function mousePressed() {
  if (gameOver)
    newGame();
  nave.velocity.y = FLAP;
  

  
  
}
