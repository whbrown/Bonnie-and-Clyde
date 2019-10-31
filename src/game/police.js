class Police extends Vehicle {
  constructor(x, y, carStylePath, carType) {
    super(x, y, carStylePath, carType);
    this.carType = carType;
    this.health = carType.health;
  }

  maneuver() {}
}

class SonarEmitter {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.emitterParticles = [];
  }

  preload() {
    this.sonarImg = loadImage('./src/game/assets/sonar-emitter.png');
    this.particleImg = loadImage(`./src/game/assets/bullet-small.png`);
  }

  setup() {
    this.test = 'test';
    this.width = this.sonarImg.width;
    this.height = this.sonarImg.height;
  }

  draw() {
    if (frameCount % 10 === 0) {
      let emitterParticle = new Bullet(
        this.particleImg,
        this.x,
        this.y,
        0.0,
        -1,
        0
      );
      this.emitterParticles.push(emitterParticle);
    }
    image(this.sonarImg, this.x, this.y, this.width, this.height);
  }
}
