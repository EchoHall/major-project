// Major Project
// p5Play engine


let road, car, curveRoad, obstical, puddle;
let gameStart = false;

let speed = 0.1;
let speedOfObs = 4;
let turningAngle = 1;

let maxHeightText = 300;
let maxWidthText = 400;
let minWidthText = 100;
let minHeightText = 200;



function setup() {
  new Canvas(windowWidth, windowHeight);

  car = new Sprite();
  car.y = windowHeight/2 + 100;
  car.x = windowWidth/2;
  car.w = 50;
  car.h = 100;
  car.layer = 3;

  road = new Sprite();
  road.y = 0;
  road.x = windowWidth/2;
  road.w = 600;
  road.h = windowHeight*2;
  road.color = "black";
  road.layer = 1;

  obstical = new Group();
  obstical.x = () => random(windowWidth/2 - road.w/2, windowWidth/2 + road.w/2);
  obstical.y = 0;
  obstical.layer = 3;
  obstical.amount = 4;

  puddle = new Sprite();
  puddle.w = random(100, 150);
  puddle.h = random(100, 150);
  puddle.x = random(windowWidth/2 - road.w/2, windowWidth/2 + road.w/2);
  puddle.y = 0;
  puddle.layer = 2;

  car.overlaps(road);
  car.overlaps(puddle);

  obstical.overlaps(puddle);
  obstical.overlaps(road);

  puddle.overlaps(road);
}

function draw() {
  clear();
  createStartScreen();
  if (gameStart){
    carTurning();
    roadMovement();
    generateObsitcal();
    generatePuddle();
  }
}

function carTurning(){
  if(car.x !== mouseX && mouseX < windowWidth/2 + road.w/2 && mouseX > windowWidth/2 - road.w/2){
    car.moveTowards(mouseX, mouseY + car.h, 0.1);
    car.rotateTowards(mouse, 1, 90);
  }
}

 


function generateObsitcal(){
  obstical.y += speedOfObs;
  if(obstical.y > windowHeight){
    obstical.y = 0;//() => random(0, windowHeight/4);
    obstical.x = () => random(windowWidth/2 - road.w/2, windowWidth/2 + road.w/2);
  }

  if(car.overlaps(obstical)){
    createResetScreen();
  }
}

function createStartScreen(){
  
  if(!gameStart){
    textSize(60);
    fill("yellow");
    stroke("black");
    text("Click Here To Start", minWidthText, minHeightText, maxWidthText, maxHeightText);
  }
  
  if(mouseIsPressed && mouseY < maxHeightText && mouseY > minHeightText && mouseX < maxWidthText && mouseX > minWidthText){
    minWidthText = -minWidthText;
    gameStart = true;
  }
}

function generatePuddle(){
  puddle.y += speedOfObs;
  if(puddle.y > windowHeight){
    puddle.w = random(100, 150);
    puddle.h = random(100, 150);
    puddle.y = 0;
    puddle.x = random(windowWidth/2 - road.w/2, windowWidth/2 + road.w/2);
  }

  if(car.overlaps(puddle)){
    speed = 0.1/2;
  }
}

function createResetScreen(){
  gameStart = false;
  minWidthText = -minWidthText;
  
  obstical.y = 0;
  car.y = windowHeight/2 + 100;
  puddle.y = 0;

  textSize(60);
  fill("yellow");
  stroke("black");
  text("Click Here To play again Start", minWidthText, minHeightText, maxWidthText, maxHeightText);

  if(mouseIsPressed && mouseY < maxHeightText && mouseY > minHeightText && mouseX < maxWidthText && mouseX > minWidthText){
    minWidthText = -minWidthText;
    gameStart = true;
  }

}