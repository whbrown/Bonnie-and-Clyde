/* eslint no-undef: 0 no-unused-vars: 0 */

class Background {
  constructor() {
    // road is between y: 300 and y: 500;
    this.roadXBasis = 0;
  }

  preload() {
    console.log('background preloading');
    this.road = loadImage('./src/game/assets/road.png');
    this.roadWidth = 2880;
  }

  draw() {
    this.roadXBasis -= 8;
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
