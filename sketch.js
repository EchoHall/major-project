// Major Project
// p5Play engine


let road, car;

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
  car.rotateTowards(mouse, 0.1, 90);
  car.overlaps(road);

  
}

function roadMovement(){
  road.y += 5;
  if (road.y > windowHeight){
    road.y = 0;
  }
}

