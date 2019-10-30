/* eslint no-unused-expressions: 0, no-undef: 0, no-unused-vars: 0 */

class Player extends Vehicle {
  constructor(x, y, imgPath) {
    super(x, y, imgPath);
    this.xMomentum = 0;
    this.yMomentum = 0;
    this.health = 100;
  }

  moveUp() {
    let min = 0;
    let max = 0.5;

    if (this.yMomentum > -1) this.yMomentum -= 0.1;

    this.targetY -= Math.floor(Math.random() * (max - min) + min);

    this.targetY += Math.random() * 2 * this.yMomentum;
  }

  moveDown() {
    let min = 0;
    let max = 0.5;

    if (this.yMomentum < 1) this.yMomentum += 0.1;
    this.targetY += Math.floor(Math.random() * (max - min) + min);
    this.targetY += Math.random() * 2 * this.yMomentum;
  }

  accelerate() {
    let min = 0;
    let max = 2;
    if (this.xMomentum < 1.5) this.xMomentum += 0.1;
    this.targetX += Math.floor(Math.random() * (max - min) + min);
    this.targetX += Math.floor(Math.random() * max) * this.xMomentum;

    // y-axis volatility increases as xMomentum increases
    this.targetY +=
      Math.random() * (this.xMomentum + this.xMomentum * 0.5) -
      this.xMomentum * 0.5;
  }

  brake() {
    let min = 0;
    let max = 2;
    if (this.xMomentum > -3) this.xMomentum -= 0.2;
    this.targetX -= Math.floor(Math.random() * (max - min) + min);
    this.targetX += Math.random() * this.xMomentum * max;

    this.targetX +=
      Math.random() * (this.xMomentum + this.xMomentum * 0.1) -
      this.xMomentum * 0.1;
  }

  draw() {
    if (this.y > 580) {
      // add rough terrain to foreground

      let noise = (roughnessFactor, xMomentum) =>
        xMomentum < 0
          ? (Math.random() / xMomentum) * roughnessFactor
          : Math.random() * xMomentum * roughnessFactor;

      Math.floor(Math.random() + 0.5)
        ? (this.targetY += noise(3, this.xMomentum) + 1)
        : (this.targetY -= noise(3, this.xMomentum));
      Math.floor(Math.random() + 0.5)
        ? (this.targetX += noise(3, this.xMomentum) + 2)
        : (this.targetX -= noise(3, this.xMomentum));
    }
    if (this.targetY < 550 && this.targetY > 600) {
      // less roughness near edge of the road

      Math.floor(Math.random() + 0.5)
        ? (this.targetY += noise(1.5, this.xMomentum) + 1)
        : (this.targetY -= noise(1.5, this.xMomentum));
      Math.floor(Math.random() + 0.5)
        ? (this.targetX += noise(1.5, this.xMomentum) + 2)
        : (this.targetX -= noise(1.5, this.xMomentum));
    }

    let min = -0.1;
    let max = 0.1;
    this.targetX += Math.floor(Math.random() * (max - min + 1) + min);

    // less control as momentum increases
    this.targetX += Math.random() * 2 * this.xMomentum;
    this.targetY += Math.random() * 2 * this.yMomentum;

    if (!isCollision(this, game.activeVehicles)) {
      this.x = this.targetX;
      this.y = this.targetY;
    }

    // prevent target coords from getting too high after presistent collisions
    const maxTargetDiff = 10;
    if (this.targetX > this.x + maxTargetDiff) {
      this.targetX = this.x + maxTargetDiff;
    } else if (this.targetX < this.x - maxTargetDiff) {
      this.targetX = this.x - maxTargetDiff;
    }
    if (this.targetY > this.y + maxTargetDiff) {
      this.targetY = this.y + maxTargetDiff;
    } else if (this.targetY < this.y - maxTargetDiff) {
      this.targetY = this.y - maxTargetDiff;
    }

    image(this.img, this.x, this.y, this.img.width, this.img.height);
    this.hitBoxDebug();
  }
}
