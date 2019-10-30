console.log(window);

const GAMEWIDTH = 1020;
const GAMEHEIGHT = 720;
const GAMEXBASIS = 0;
const GAMEYBASIS = 0;
const CANVASBUFFER = 10;
const carSpeed = 7;

function cotan(x) {
  return 1 / Math.tan(x);
}

const civilianCarTypes = {
  SUV: {
    name: 'SUV',
    imgPath: './src/game/assets/car4.png',
    health: 150,
    drivingStyle: 'conservative',
    wreckNum: 0,
  },
  Buick: {
    name: 'Buick',
    imgPath: './src/game/assets/car5.png',
    health: 120,
    drivingStyle: 'conservative',
    wreckNum: 1,
  },
  'Kissel White Eagle': {
    name: 'Kissel White Eagle',
    imgPath: './src/game/assets/car6.png',
    health: 100,
    drivingStyle: 'standard',
    wreckNum: 2,
  },
  'Ford Model B': {
    name: 'Ford Model B',
    imgPath: './src/game/assets/car7.png',
    health: 100,
    drivingStyle: 'standard',
    wreckNum: 2,
  },
  'Ford Model A': {
    name: 'Ford Model A',
    imgPath: './src/game/assets/car8.png',
    health: 80,
    drivingStyle: 'slow',
    wreckNum: 1,
  },
  Cadillac: {
    name: 'Cadillac',
    imgPath: './src/game/assets/car9.png',
    health: 120,
    drivingStyle: 'aggressive',
    wreckNum: 0,
  },
};
