/* eslint no-undef: 0, no-unused-vars: 0 */

const game = new Game();

function preload() {
  console.log('preload');
  bulletImg = loadImage('./src/game/assets/bullet.png');
  game.preload();
}

function setup() {
  console.log('setup');
  createCanvas(GAMEWIDTH, GAMEHEIGHT);
  game.setup();
}

function draw() {
  // * player controls
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    game.player.accelerate();
  }
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    game.player.brake();
  }
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    game.player.moveUp();
  }
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    game.player.moveDown();
  }

  game.draw();
}
