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
  fond = loadImage("assets/fondo-01.png");
  rectMode(CORNER);

  //create an animation from a sequence of numbered images
  //pass the first and the last file name and it will try to find the ones in between


}

function setup() {

  createCanvas(632, 755);
  GRAVITY = 0.3;

  fondo = createSprite(width * 0.50, height * 0.50);
  fondo.addImage(fond);
//  fondo.velocity.y = 1;

  caminaani = loadAnimation("assets/camina-01.png", "assets/camina-09.png");
  mani = loadAnimation("assets/mani-01.png", "assets/mani-16.png");

  //caminaani.addAnimation("caminar","assets/camina-01.png", "assets/camina-09.png");
  //mani.addAnimation("pegar","assets/mani-01.png", "assets/mani-16.png");
  rectMode(CENTER);
 
  s1 = createSprite(0, 1016, 2000, height);
  s1.shapeColor = color(0, 0, 255, 0);
  
  s1.debug = false;

  s2 = createSprite(.65 * width, .8 * height, width * .25, 0.02 * height);
  s2.velocity.y = -1;
 s2.position = random;
  s2.shapeColor = color(119, 99, 88);
  s2.debug = false;

  s3 = createSprite(.3 * width, .7 * height, width * .25, 0.02 * height);
  s3.velocity.y = -1.2
  s3.shapeColor = color(119, 99, 88);
  s3.debug = false;
  
  
  //techo
    s4 = createSprite(0.5*width, -50, width, 100);
  //s4.velocity.y = -1.2
  s4.shapeColor = color(119, 99, 88,0);
  s4.debug = true;
  s4.setCollider('rectangle', 0, 0, width, 100);
  //techo
  
  s5 = createSprite(.5 * width, .6 * height, width * .10, 0.02 * height);
  s5.velocity.y = -0.5;
  s5.shapeColor = color(119, 99, 88);
  s5.debug = false;
  


  camina = createSprite(width * 0.1, 420);
  camina.addAnimation('camina', caminaani);
  camina.velocity.x = 1;
  camina.setCollider('rectangle', 0, 0, 90, 60);
  camina.debug = false;
  camina.scale = 0.5;

}

function draw() {
  background(0);
  if (camina.collide(s1) || camina.collide(s2) || camina.collide(s3)|| camina.collide(s4)|| camina.collide(s5)) {

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