/* eslint no-undef: 0 no-unused-vars: 0 */

class Road {
  constructor() {
    // road is between y: 300 and y: 500;
    this.roadXBasis = 0;
    this.roadSpeed = 7;
  }

  preload() {
    console.log('road preloading');
    this.road = loadImage('./assets/road.png');
    this.roadWidth = 2880;
  }

  draw() {
    this.roadXBasis -= carSpeed;
    image(this.road, this.roadXBasis, 260, this.roadWidth, 460);
    image(
      this.road,
      this.roadXBasis + this.roadWidth,
      260,
      this.roadWidth,
      460
    );
    if (this.roadXBasis <= -this.roadWidth) {
      this.roadXBasis = 0;
    }
  }
}

class Background {
  constructor() {
    this.backgroundXBasis = 0;
  }

  preload() {
    console.log('background preloading');
    this.background = loadImage('/assets/panoramic-background.png');
    this.backgroundWidth = 2770;
  }

  draw() {
    this.backgroundXBasis -= 6.75;
    image(this.background, this.backgroundXBasis, 0, this.backgroundWidth, 290);
    image(
      this.background,
      this.backgroundXBasis + this.backgroundWidth - 1,
      0,
      this.backgroundWidth,
      290
    );
    if (this.backgroundXBasis <= -this.backgroundWidth) {
      this.backgroundXBasis = 0;
    }
  }
}
