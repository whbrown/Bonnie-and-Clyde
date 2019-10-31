class Police extends Vehicle {
  constructor(x, y, carStylePath, carType) {
    super(x, y, carStylePath, carType);
    this.carType = carType;
    this.health = carType.health;
    this.currentLaneIndex = 0;
    this.isPolice = true;
    this.bonusSpeed = 1.7;
  }

  draw() {
    let longestLane = -Infinity;
    let longestAdjacent = -Infinity;
    game.sonarLanes.forEach((lane, laneIndex) => {
      if (lane > longestLane && lane > game.sonarLanes[this.currentLaneIndex]) {
        longestLane = lane;
        this.currentLaneIndex = laneIndex;
      }
      // if (
      //   (lane > game.sonarLanes[this.currentLaneIndex] &&
      //     laneIndex <= this.currentLaneIndex + 1) ||
      //   laneIndex >= this.currentLaneIndex - 1
      // ) {
      //   this.currentLaneIndex = laneIndex;
      // }
    });
    if (this.targetX < 50) {
      this.bonusSpeed = 2;
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
    this.sonarImg = loadImage('./src/game/assets/sonar-emitter.png');
    this.particleImg = loadImage(`./src/game/assets/bullet-small.png`);
  }

  setup() {
    this.test = 'test';
    this.y += this.sonarImg.height / 2;
    this.width = this.sonarImg.width;
    this.height = this.sonarImg.height;
  }

  draw() {
    if (frameCount % 30 === 0) {
      let emitterParticle = new SonarParticle(
        this.x,
        this.y,
        this.emitterLane,
        './src/game/assets/sonar-particle.png'
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
