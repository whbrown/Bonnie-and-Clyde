/* eslint no-undef: 0, */

class Bullet {
  constructor(x, y, angle, shooterID) {
    this.x = x;
    this.targetX = x;
    this.y = y;
    this.targetY = y;
    this.objectID = shooterID;
    this.imgPath = './src/game/assets/bullet-small.png';

    // angle comes in radians calculated using atan2
    this.angle = angle;
    this.speed = 20;
  }

  preload() {
    this.img = loadImage('./src/game/assets/bullet-small.png');
  }

  draw() {
    this.targetX += this.speed * Math.cos(this.angle);
    this.targetY += this.speed * Math.sin(this.angle);

    // TODO: loop over activeVehicles: if !collision, then:
    let collision = false;

    if (!collision) {
      // TODO: store this filtered array, and immediately iterate over it, decrementing vehicle.health.

      game.activeVehicles.find(vehicle => {
        if (isCollision(this, vehicle)) {
          return (vehicle.health -= 50);
        }
        return false;
      });
    }
    if (!collision) {
      this.x = this.targetX;
      this.y = this.targetY;
    }

    this.x = this.targetX;
    this.y = this.targetY;
    // circle(this.x, this.y, 5);
    image(this.img, this.x, this.y, img.width / 3, img.height / 3);
  }
}
