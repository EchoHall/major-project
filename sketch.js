// Major Project
// p5Play engine


let road, car, curveRoad, obstical;

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
  road.y = 0;
  road.x = windowWidth/2;
  road.w = 600;
  road.h = windowHeight*2;
  road.color = "black";
  road.layer = 1;

  obstical = new Sprite();
  obstical.x = random(windowWidth/2 - road.w/2, windowWidth/2 + road.w/2);
  obstical.y = 0;
  obstical.layer = 2;

}

function draw() {
  clear();
  carTurning();
  roadMovement();
  generateObsitcal();
}

function carTurning(){
  //helps car drift
  car.overlaps(road);
  // car.overlaps(curveRoad);

  // if (keyIsDown(65)){
  //   car.rotateMinTo(-45, 5);
  // }

  // else if (keyIsDown(68)){
  //   car.rotateMinTo(45, 5);
  // }

  // else{
  //   car.rotateMinTo(0, 5);
  // }

  car.overlaps(road);
  if(car.x !== mouseX){
    car.moveTowards(mouseX, mouseY + car.h, 0.1);
    car.rotateTowards(mouse, 0.1, 90);
  }
}

function roadMovement(){
  //ratio for turning angles
  

  // if (keyIsDown(65)){
  //   road.rotate(-turningAngle);
  // }

  // if (keyIsDown(68)){
  //   road.rotate(turningAngle);
  // }

  //speed up
  if (keyIsDown(87)){
    speed +=0.2;
  }
  //slow down
  if (keyIsDown(83)){
    speed -= 0.2;
  }
  //slowest
  if (speed < 0.5){
    speed = 0.5;
  }
  
}

// function generateCurveRoad(){
//   curveRoad = new Sprite();
//   curveRoad.y = windowHeight/2;
//   curveRoad.x = windowWidth/2;
//   curveRoad.w = 600;
//   curveRoad.h = windowHeight;
//   curveRoad.color = "black";
//   curveRoad.layer = 1;
// }

function generateObsitcal(){

  obstical.y += 1;
  if(obstical.y > windowHeight){
    obstical.y = 0;
  }
}