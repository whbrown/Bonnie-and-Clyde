class Vehicle {
  constructor(x, y, imgPath) {
    this.x = x;
    this.y = HEIGHT - y;
    this.imgPath = imgPath;
  }

  preload() {
    this.img = loadImage(this.imgPath);
  }

  setup() {
    console.log('run player setup');
    this.originalX = this.x;
    this.originalY = this.y;
  }

  draw() {
    // make this min/max predicated of the style of vehicle
    let min = -3;
    let max = -0.5;
    this.x += Math.floor(Math.random() * (max - min + 1) + min);
    image(this.img, this.x, this.y, this.img.width, this.img.height);
  }
}

class NPC extends Vehicle {
  constructor(x, y, imgPath, style) {
    super(x, y, imgPath);
    this.style = style;
  }
}
