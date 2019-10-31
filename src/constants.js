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

// emitterIDtoSonarLane = {
//   '-1': 0,
//   '-2': 1,
//   '-3': 2,
//   '-4': 3,
//   '-5': 4,
// };

const policeCarTypes = {
  'Paddy Wagon': {
    name: 'Paddy Wagon',
    imgPath: './assets/policepaddywagon.png',
    health: 300,
    drivingStyle: 'righteous',
    wreckNum: 0, // TODO: replace wreck with police specific wreck
  },
};

const civilianCarTypes = {
  SUV: {
    name: 'SUV',
    imgPath: './assets/car4.png',
    health: 150,
    drivingStyle: 'conservative',
    wreckNum: 0,
  },
  Buick: {
    name: 'Buick',
    imgPath: './assets/car5.png',
    health: 120,
    drivingStyle: 'conservative',
    wreckNum: 1,
  },
  'Kissel White Eagle': {
    name: 'Kissel White Eagle',
    imgPath: './assets/car6.png',
    health: 100,
    drivingStyle: 'standard',
    wreckNum: 3,
  },
  'Ford Model B': {
    name: 'Ford Model B',
    imgPath: './assets/car7.png',
    health: 100,
    drivingStyle: 'standard',
    wreckNum: 2,
  },
  'Ford Model A': {
    name: 'Ford Model A',
    imgPath: './assets/car8.png',
    health: 80,
    drivingStyle: 'slow',
    wreckNum: 1,
  },
  Cadillac: {
    name: 'Cadillac',
    imgPath: './assets/car9.png',
    health: 100,
    drivingStyle: 'aggressive',
    wreckNum: 0,
  },
};
