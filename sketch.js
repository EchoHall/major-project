// Major Project
// p5Play engine


let road, car;

let speed = 5;
let turningAngle = 1;

function setup() {
  new Canvas(windowWidth, windowHeight);

  car = new Sprite();
  car.y = windowHeight/2 + 100;
  car.x = windowWidth/2;
  car.w = 50;
  car.h = 100;
  car.layer = 2;

  road = new Sprite();
  road.y = windowHeight/2;
  road.x = windowWidth/2;
  road.w = 600;
  road.h = windowHeight;
  road.color = "black";
  road.layer = 1;


}

function draw() {
  clear();
  carTurning();
  roadMovement();
}

function carTurning(){
  //helps car dodge obsticals
  car.overlaps(road);
  if(car.x !== mouseX){
    car.moveTowards(mouseX, mouseY + car.h, 0.1);
    car.rotateTowards(mouse, 0.1, 90);
  }
}

function roadMovement(){
  //ratio for turning angles
  

  if (keyIsDown(65)){
    road.rotate(-turningAngle);
  }

  if (keyIsDown(68)){
    road.rotate(turningAngle);
  }

  //speed up
  if (keyIsDown(87)){
    speed +=0.2;
  }
  //slow down
  if (keyIsDown(83)){
    speed -= 0.2;
  }
  //slowest
  if (speed < 1){
    speed = 1;
  }
  
}