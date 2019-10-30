/* eslint no-undef: 0, no-unused-vars: 0 */

class Vehicle {
  constructor(x, y, imgPath) {
    this.x = x;
    this.y = y;
    this.targetX = x;
    this.targetY = y;
    this.imgPath = imgPath;
    this.wrecked = false;
  }

  preload() {
    this.img = loadImage(this.imgPath);
    this.wreck1 = loadImage('./src/game/assets/carwreck1.png');
    // this.wrecks.forEach(wreck => loadImage(wreck));
  }

  setup() {
    console.log('run vehicle setup');
    this.originalX = this.x;
    this.originalY = this.y;
  }

  draw() {
    // TODO: make this min/max predicated of the type of vehicle
    let min = -3;
    let max = -0.5;
    if (!this.wrecked) {
      this.targetX += Math.floor(Math.random() * (max - min + 1) + min);
    }
    if (this.wrecked) {
      this.targetX += -7;
    }

    // TODO: refactor the code block below (down to image call) out into a seperate method so it can be used by vehicle subclasses with polymorphic draw methods (e.g. Player)
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
    if (!collision || this.wrecked) {
      this.x = this.targetX;
      this.y = this.targetY;
    } else {
      this.health -= 10;
      this.x -= carSpeed;
    }
    // prevent target coords from getting too high after presistent collisions
    const maxTargetDiff = 20;
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
  constructor(x, y, carStylePath, carType) {
    super(x, y, carStylePath, carType);
    this.carType = carType;
    this.health = carType.health;
  }
}
