var GRAVITY = 0;
var GROUND_Y = 950;
var MIN_OPENING = 300;
var nave, ground;
var mets;

var gameOver;

var naveImg, metImg, groundImg, bgImg;
var postexto = 0;

function setup() {
  createCanvas(800, 800);

  naveImg = loadImage("assets/nave.png");

  groundImg = loadImage("assets/flappy_ground.png");
  bgImg = loadImage("assets/fondo.png");
  metImg = loadImage("assets/met.png");

  nave = createSprite(width * .5, height * .5, 40, 40);
  nave.rotateToDirection = false;

  nave.velocity.x = 10;

  nave.setCollider("rectangle", 20, -12, 100, 50);
  nave.debug = true;
  nave.addImage(naveImg);

  ground = createSprite(800 / 2); //image 800x200
  ground.addImage(groundImg);

  postexto = 0.9 * width;

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
      met.scale = random(0, 1.5);
      met.duplicate
      met.velocity.x = random(5, 13);
      met.rotate = random(0, 360);
      mets.add(met);
      met.setCollider("circle", 0, 0, 35);
      met.debug = true;


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


  if (camera.position.x)


    background(98, 105, 124);
  camera.off();
  image(bgImg, 0);
  camera.on();
  drawSprites(mets);
  drawSprite(nave);
  text(millis()/1000, postexto, 0.1 * height);
  postexto = nave.position.x+0.5*width;


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
  nave.velocity.y = 10;
  ground.position.x = 800 / 2;
  ground.position.y = GROUND_Y + 200;
}

function mousePressed() {
  if (gameOver)
    newGame();
      


}