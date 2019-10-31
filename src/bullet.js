/* eslint no-undef: 0, */

class Bullet {
  constructor(x, y, angle, shooterID, damage, imgPath) {
    this.x = x;
    this.targetX = x;
    this.y = y;
    this.targetY = y;
    this.objectID = shooterID;
    this.damage = damage;
    this.imgPath = imgPath;

    // angle comes in radians calculated using atan2
    this.angle = angle;
    this.speed = 20;
  }

  preload() {
    this.img = loadImage(this.imgPath);
    // './src/game/assets/bullet-small.png'
  }

  draw(bulletIndex) {
    this.targetX += this.speed * Math.cos(this.angle);
    this.targetY += this.speed * Math.sin(this.angle);

    // TODO: loop over activeVehicles: if !collision, then:
    let collision = false;

    if (!collision) {
      // TODO: store this filtered array, and immediately iterate over it, decrementing vehicle.health.
      game.activeVehicles.find(vehicle => {
        if (isCollision(this, vehicle)) {
          game.bullets.splice(bulletIndex, 1);
          vehicle.health -= this.damage;
          if (vehicle.health <= 0 && this.shooterID === 1) {
            game.player.murderCount += 1;
          }
          return vehicle.health;
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

class SonarParticle extends Bullet {
  constructor(x, y, emitterLane, imgPath) {
    super(x, y, 0, -1, 0, imgPath);
    this.emitterLane = emitterLane;
    this.speed = 10;
  }

  draw(particleIndex) {
    this.targetX += this.speed * Math.cos(this.angle);
    this.targetY += this.speed * Math.sin(this.angle);
    let collision = false;
    if (!collision) {
      game.activeVehicles.find(vehicle => {
        if (isCollision(this, vehicle) && !vehicle.isPolice) {
          game.sonarEmitters[this.emitterLane].emitterParticles.splice(
            particleIndex,
            1
          );
          game.sonarLanes[this.emitterLane] = vehicle.x || GAMEWIDTH;
          return (collision = true);
        }
        if (this.x > game.sonarLanes[this.emitterLane]) {
          // console.log(this.x);
          game.sonarLanes[this.emitterLane] = this.x;
        }
        return false;
      });
    }
    if (!collision) {
      // game.sonarLanes[this.emitterLane] = GAMEWIDTH;
      this.x = this.targetX;
      this.y = this.targetY;
    }

    this.x = this.targetX;
    this.y = this.targetY;
    if (this.x > GAMEWIDTH) {
      game.sonarEmitters[this.emitterLane].emitterParticles.splice(
        particleIndex,
        1
      );
    }
    image(this.img, this.x, this.y, img.width, img.height);
  }
}
