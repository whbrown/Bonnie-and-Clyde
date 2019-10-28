class Player extends Vehicle {
  constructor(x, y, imgPath) {
    super(x, y, imgPath);
    this.xMomentum = 0;
    this.yMomentum = 0;
  }

  moveUp() {
    if (this.yMomentum > -0.2) this.yMomentum -= 0.03;

    // add randomness to keyDown movement
    this.y -= Math.floor(Math.random() * 5);

    // add randomness to movement by momentum
    this.y += Math.random() * 2 * this.yMomentum;
  }

  moveDown() {
    if (this.yMomentum < 0.2) this.yMomentum += 0.03;
    this.y += Math.floor(Math.random() * 5);
    this.y += Math.random() * 2 * this.yMomentum;
  }

  accelerate() {
    let min = 1;
    let max = 5;
    if (this.xMomentum < 1) this.xMomentum += 0.3;
    this.x += Math.floor(Math.random() * (max - min + 1) + min);
    this.x += Math.random() * 2 * this.xMomentum;
  }

  brake() {
    let min = 1;
    let max = 5;
    if (this.xMomentum > -1) this.xMomentum -= 0.3;
    this.x -= Math.floor(Math.random() * (max - min + 1) + min);
    this.x += Math.random() * 2 * this.xMomentum;
  }

  draw() {
    let min = -0.1;
    let max = 0.1;
    this.x += Math.floor(Math.random() * (max - min + 1) + min);
    this.x += Math.random() * 2 * this.xMomentum;
    this.y += Math.random() * 2 * this.yMomentum;
    image(this.img, this.x, this.y, this.img.width, this.img.height);
  }
}
