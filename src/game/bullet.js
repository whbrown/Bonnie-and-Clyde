class Bullet {
  constructor(x, y, angle, shooterID) {
    this.x = x;
    this.y = y;
    this.shooterID = shooterID;
    this.imgPath = './src/game/assets/bullet.png';

    // angle comes in radians calculated using atan2
    this.angle = angle;
    this.speed = 20;
  }

  preload() {
    console.log('preloading bullet');
    // bulletImg = loadImage('./src/game/assets/bullet.png');
  }

  draw() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);

    circle(this.x, this.y, 5);
    // image(bulletImg, this.x, this.y, bulletImg.width, bulletImg.height);
  }
}
