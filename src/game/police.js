class Police extends Vehicle {
  constructor(x, y, carStylePath, carType) {
    super(x, y, carStylePath, carType);
    this.carType = carType;
    this.health = carType.health;
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
