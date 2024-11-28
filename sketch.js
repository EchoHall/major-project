// Major Project
// p5Play engine


let car;

function setup() {
  new Canvas(windowWidth, windowHeight);

  car = new Sprite();
  car.y = windowHeight/2 + 100;
  car.x = windowWidth/2;
  car.w = 50;
  car.h = 100;

}

function draw() {
  clear();
  car.rotateTowards(mouse, 0.1, 90);
}