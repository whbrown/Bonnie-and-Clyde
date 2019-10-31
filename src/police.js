class Police extends Vehicle {
  constructor(x, y, carStylePath, carType) {
    super(x, y, carStylePath, carType);
    this.carType = carType;
    this.health = carType.health;
    this.currentLaneIndex = 0;
    this.isPolice = true;
    this.bonusSpeed = 1.7;
    this.objectID = -1;
  }

  updateAim() {
    this.aimAngle = atan2(game.player.y - this.y, game.player.x - this.x);

    // convert from radians to degrees
    // this.aimAngle =
    //   ((this.aimAngle >= 0 ? this.aimAngle : 2 * Math.PI + this.aimAngle) *
    //     360) /
    //   (2 * Math.PI);
  }

  draw() {
    if (frameCount % 20 === 0 && game.player.health > 0) {
      this.updateAim();
      let newBullet = new Bullet(
        this.x + this.img.width / 2,
        this.y + this.img.height / 2,
        this.aimAngle * Math.random() - 0.5 / 1000,
        -1,
        15,
        './assets/bullet-small.png'
      );
      newBullet.preload();
      game.bullets.push(newBullet);
    }
    // let longestLane = -Infinity;
    // let longestAdjacent = -Infinity;
    game.sonarLanes.forEach((lane, laneIndex) => {
      // if (lane > longestLane && lane > game.sonarLanes[this.currentLaneIndex]) {
      //   longestLane = lane;
      //   // this.currentLaneIndex = laneIndex;
      // }

      // current lane: 2--- lane index 4
      if (
        lane > game.sonarLanes[this.currentLaneIndex] &&
        frameCount % 20 === 0 &&
        (laneIndex === this.currentLaneIndex + 1 ||
          laneIndex === this.currentLaneIndex - 1)
      ) {
        this.currentLaneIndex = laneIndex;
      }
    });

    // console.log(this.currentLaneIndex);
    if (this.targetX < 50) {
      this.bonusSpeed = 2.2;
    } else {
      this.bonusSpeed = 1.6;
    }
    if (frameCount % 20 === 0 && frameCount > 60) {
      this.targetY = game.trafficLanes[this.currentLaneIndex];
    }
    super.draw(this.bonusSpeed);
  }

  maneuver() {}
}

class SonarEmitter {
  constructor(x, y, emitterLane, debug = false) {
    this.x = x;
    this.y = y;
    this.emitterLane = emitterLane;
    this.emitterParticles = [];
    this.debug = debug;
  }

  preload() {
    this.sonarImg = loadImage('./assets/invisible-sonar-emitter.png');
    this.particleImg = loadImage(`./assets/bullet-small.png`);
  }

  setup() {
    this.test = 'test';
    this.y += this.sonarImg.height / 2;
    this.width = this.sonarImg.width;
    this.height = this.sonarImg.height;
  }

  draw() {
    if (frameCount % 30 === 0 && game.activePolice.length) {
      let emitterParticle = new SonarParticle(
        this.x,
        this.y,
        this.emitterLane,
        './assets/sonar-particle.png'
      );
      emitterParticle.preload();
      this.emitterParticles.push(emitterParticle);
    }
    this.emitterParticles.forEach((particle, index) => {
      particle.draw(index);
    });
    image(this.sonarImg, this.x, this.y, this.width, this.height);
  }
}
