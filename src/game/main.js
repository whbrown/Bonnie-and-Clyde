/* eslint no-undef: 0, no-unused-vars: 0 */

const game = new Game();

function preload() {
  console.log('preload');
  game.preload();
}

function setup() {
  console.log('setup');
  createCanvas(720, 720);
  game.setup();
}

function draw() {
  // * player controls
  if (keyIsDown(RIGHT_ARROW)) {
    game.player.accelerate();
  }
  if (keyIsDown(LEFT_ARROW)) {
    game.player.brake();
  }
  if (keyIsDown(UP_ARROW)) {
    game.player.moveUp();
  }
  if (keyIsDown(DOWN_ARROW)) {
    game.player.moveDown();
  }
  game.draw();
}
