// Major Project
// p5Play engine


let road, car, curveRoad, obstical, puddle, buildings;
let carSlowing, carSpeeding;

let gameStart = false;

let minSpeed = 0.5;
let speedOfObs = 4;
let turningAngle = 1;

let maxHeightText = 300;
let maxWidthText = 400;
let minWidthText = 120;
let minHeightText = 200;

function preload(){
  carSlowing = loadSound("tires_squal_loop.wav");
  carSpeeding = loadSound("car acceleration.wav");
}

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
  obstical.y = () => random(100);
  obstical.w = 30;
  obstical.h = 30;
  obstical.layer = 3;
  obstical.amount = 4;

  puddle = new Sprite();
  puddle.w = random(100, 150);
  puddle.h = random(100, 150);
  puddle.x = random(windowWidth/2 - road.w/2, windowWidth/2 + road.w/2);
  puddle.y = 0;
  puddle.layer = 2;

  buildings = new Group();
  buildings.w = 100;
  buildings.h = 150;
  buildings.x = () => random(windowWidth/2 - road.w/2 - buildings.w/2);
  buildings.y = () => random(windowHeight);
  buildings.collider = "s";
  buildings.layer = 0;
  buildings.amount = 10;
  
  car.overlaps(road);
  car.overlaps(puddle);

  obstical.overlaps(puddle);
  obstical.overlaps(road);

  puddle.overlaps(road);


  //Sound
  carSlowing.amp(1);
  carSpeeding.amp(1);
}

function draw() {
  clear();
  createStartScreen();
  if (gameStart){
    carTurning();
    changeSpeed();
    generateObsitcal();
    generatePuddle();
    generateBackground();
  }
}

function carTurning(){
  if(car.x !== mouseX && mouseX < windowWidth/2 + road.w/2 && mouseX > windowWidth/2 - road.w/2){
    car.moveTowards(mouseX, car.y, 0.1);
    car.rotateTowards(mouse, 1, 90);
  }

  if(car.x > windowWidth/2 + road.w/2 || car.x < windowWidth/2 - road.w/2){
    createResetScreen();
  }
}

function changeSpeed(){
  //speed up
  if (keyIsDown(87)){
    speedOfObs +=0.2;
    carSpeeding.play();
  }
  //slow down
  if (keyIsDown(83)){
    speedOfObs -= 0.2;
    carSlowing.play();
  }
  //slowest
  if (speedOfObs < minSpeed){
    speedOfObs = minSpeed;
  }
}

function generateObsitcal(){
  if(obstical.y < windowHeight){
    obstical.y += speedOfObs;
  }

  else{    
    obstical.y = 0;
    obstical.x = () => random(windowWidth/2 - road.w/2 + obstical.w, windowWidth/2 + road.w/2 - obstical.w);
  }

  //restart if crash
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
    maxWidthText = -maxWidthText;
    gameStart = true;
  }
}

function generatePuddle(){
  puddle.y += speedOfObs;
  if(puddle.y > windowHeight){
    puddle.w = random(100, 150);
    puddle.h = random(100, 150);
    puddle.y = 0;
    puddle.x = random(windowWidth/2 - road.w/2 + puddle.w, windowWidth/2 + road.w/2 - puddle.w);
  }

  if(car.overlaps(puddle)){
    speedOfObs = speedOfObs/2;
  }
}

function createResetScreen(){
  gameStart = false;
  minWidthText = -minWidthText;
  maxWidthText = -maxWidthText;
  
  //reset placement
  obstical.y = 0;
  car.y = windowHeight/2 + 100;
  car.x = windowWidth/2;
  puddle.y = 0;
  speedOfObs = 4;
}

function generateBackground(){
  if(buildings.y < windowHeight){
    buildings.y += speedOfObs;
  }

  else{
    buildings.y = 0;
    buildings.x = () => random(windowWidth/2 - road.w/2 - buildings.w/2);
  }
}