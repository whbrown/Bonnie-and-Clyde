/* eslint no-undef: 0, no-unused-vars: 0 */

class Vehicle {
  constructor(x, y, imgPath) {
    this.x = x;
    this.y = y;
    this.imgPath = imgPath;
  }

  preload() {
    this.img = loadImage(this.imgPath);
  }

  setup() {
    console.log('run vehicle setup');
    this.originalX = this.x;
    this.originalY = this.y;
  }

  draw() {
    // TODO: make this min/max predicated of the style of vehicle
    let min = -3;
    let max = -0.5;
    this.x += Math.floor(Math.random() * (max - min + 1) + min);
    image(this.img, this.x, this.y, this.img.width, this.img.height);
    // this.hitBoxDebug();
  }

  // * Debug functions
  hitBoxDebug() {
    push();
    fill('rgba(0, 0, 0, 0)');
    stroke('green');
    rect(
      this.x,
      this.y + this.img.height - this.img.height / 2.5,
      this.img.width,
      this.img.height / 2.5
    );
    // line(
    //   0,
    //   this.y + this.img.height - this.img.height / 2.5,
    //   WIDTH,
    //   this.y + this.img.height - this.img.height / 2.5
    // );
    // line(0, this.y + this.img.height, WIDTH, this.y + this.img.height);
    // line(this.x, 0, this.x, HEIGHT);
    // line(this.x + this.img.width, 0, this.x + this.img.width, HEIGHT);
    pop();
  }
}

class Civilian extends Vehicle {
  constructor(x, y, carStylePath) {
    super(x, y, carStylePath);
  }
}
