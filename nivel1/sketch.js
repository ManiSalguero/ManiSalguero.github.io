//Creating animations

//animations like p5 images should be stored in variables
//in order to be displayed during the draw cycle
var s1;
var s2;
var mani;
var fondo;
var fond;
var camina;
var caminaani;
var GRAVITY;

//it's advisable (but not necessary) to load the images in the preload function
//of your sketch otherwise they may appear with a little delay
function preload() {
  fond = loadImage("assets/escenario.png");


  //create an animation from a sequence of numbered images
  //pass the first and the last file name and it will try to find the ones in between


}

function setup() {

  createCanvas(3000, 540);
  GRAVITY = 0.3;

  fondo = createSprite(width * 0.50, height * 0.50);
  fondo.addImage(fond);
  //fondo.velocity.x = -4;

  caminaani = loadAnimation("assets/camina-01.png", "assets/camina-09.png");
  mani = loadAnimation("assets/mani-01.png", "assets/mani-16.png");

  //caminaani.addAnimation("caminar","assets/camina-01.png", "assets/camina-09.png");
  //mani.addAnimation("pegar","assets/mani-01.png", "assets/mani-16.png");
  rectMode(CORNERS);
  s1 = createSprite(0 * width, 0.90 * height, width * .408, 0.15 * height);
  s1.shapeColor = color(0, 0, 255, 0);
  s1.debug = true;

  s2 = createSprite(.315 * width, 0.90 * height, width * .2, 0.15 * height);
  s2.shapeColor = color(0, 0, 255);
  s2.debug = true;

  s3 = createSprite(.1 * width, 0.4 * height, width * .08, 0.02 * height);
  s3.shapeColor = color(0, 0, 255);
  s3.debug = true;


  camina = createSprite(width * 0.1, 420);
  camina.addAnimation('camina', caminaani);
  // camina.velocity.x = 1;
  camina.setCollider('rectangle', 0, 0, 90, 60);
  camina.debug = true;
  camina.scale = 0.5;

}

function draw() {
  background(0);
  if (camina.collide(s1) || camina.collide(s2) || camina.collide(s3)) {
    // print("nosumando");
  } else {
    // print("sumando");
    camina.velocity.y = camina.velocity.y + GRAVITY;
  }
  drawSprites();
  camina.position.x = mouseX;


  //  animation(mani, 100, 420);
  //animation(camina, 300, 420);
}

function mouseClicked() {
  camina.velocity.y = -7;

}



function keyPressed() {
  if (keyCode === UP_ARROW) {
    mani.addAnimation("caminaani", "assets/mani-01.png", "assets/mani-16.png");
  } else if (keyCode === UP_ARROW) {
    caminaani.changeAnimation("mani", "assets/camina-01.png", "assets/camina-09.png");
  }
  
  
}