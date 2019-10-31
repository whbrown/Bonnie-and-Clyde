/* eslint no-unused-expressions: 0, no-undef: 0, no-unused-vars: 0 */

class Player extends Vehicle {
  constructor(x, y, imgPath) {
    super(x, y, imgPath);
    this.xMomentum = 0;
    this.yMomentum = 0;
    this.health = 150;
    this.aimAngle = 0;
    // TODO: increment murderCount whenever player kills civilian/cop
    this.murderCount = 0;
    this.carType = {
      wreckNum: 3,
    };
  }

  updateAim(mx, my) {
    this.aimAngle = atan2(my - this.y, mx - this.x);

    // convert from radians to degrees
    // this.aimAngle =
    //   ((this.aimAngle >= 0 ? this.aimAngle : 2 * Math.PI + this.aimAngle) *
    //     360) /
    //   (2 * Math.PI);
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
    if (this.y > 580 && !this.wrecked) {
      // adds rough terrain to foreground
      this.health -= 0.5;
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
    if (this.targetY < 550 && this.targetY > 600 && !this.wrecked) {
      // less roughness near edge of the road
      this.health -= 0.25;

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
    let collision = false;

    if (this.targetY < 255) {
      // if vehicle is colliding with the road barrier
      collision = true;
    }

    if (!collision) {
      collision = game.activeVehicles.filter(vehicle =>
        isCollision(this, vehicle)
      ).length;
    }

    if (!collision) {
      this.targetX;
      this.x = this.targetX;
      this.y = this.targetY;
    } else {
      this.health -= 7.5;
      this.x -= carSpeed;
    }
    // TODO: simple imitation of newton's 3rd law
    // else {
    //   let xDiff =
    //     this.x > this.targetX ? this.x - this.targetX : this.targetX - this.x;
    //   let yDiff =
    //     this.y > this.targetY ? this.y - this.targetY : this.targetY - this.y;
    // }

    const maxTargetDiff = 20;
    // prevents target coords from becoming too divergent from actual coords after presistent collisions which causes clipping
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

    if (this.wrecked) {
      this.x -= carSpeed;
      this.xMomentum = 0;
      this.yMomentum = 0;
      this.targetX = this.x;
      this.targetY = this.y;
    }

    image(this.img, this.x, this.y, this.img.width, this.img.height);
    // this.hitBoxDebug();
  }
}
