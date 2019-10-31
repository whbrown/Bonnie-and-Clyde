/* eslint no-undef: 0, no-unused-vars: 0, dot-notation: 0 */

// TODO: aim accuracy meter, kill count, timer
class Game {
  constructor() {
    this.road = new Road();
    this.background = new Background();
    this.bullets = [];
    this.player = new Player(100, 550, './assets/car3.png');
    this.civilian1 = new Civilian(
      720,
      400,
      civilianCarTypes['SUV'].imgPath,
      civilianCarTypes['SUV']
    );
    this.civilian2 = new Civilian(
      300,
      450,
      civilianCarTypes['Buick'].imgPath,
      civilianCarTypes['Buick']
    );
    this.police = new Police(
      1,
      300,
      policeCarTypes['Paddy Wagon'].imgPath,
      policeCarTypes['Paddy Wagon']
    );
    this.objectID = 1;
    this.roadMaxY = 500;
    this.roadMinY = 300;
    // array of 5 values which map to 5 40px strips of the road from 300 to 500 corresponding with the difference between the police-car's x value and the x value of the nearest vehicle within
    // 300-340, 340-380, 380-420, 420-460, 460-500;
    this.sonarLanes = [GAMEWIDTH, GAMEWIDTH, GAMEWIDTH, GAMEWIDTH, GAMEWIDTH];
    // each traffic lane corresponds with a y axis that cars are allowed to spawn on.
    // this.trafficLanes = [300, 340, 380, 420, 460];
    this.trafficLanes = [300, 350, 400, 450, 500];
  }

  preload() {
    // TODO: move wreck loadimage to vehicles class
    this.carWreck1 = loadImage('./assets/carwreck1.png');
    this.carWreck2 = loadImage('./assets/carwreck2.png');
    this.carWreck3 = loadImage('./assets/carwreck3.png');
    this.carWreck4 = loadImage('./assets/carwreck4.png');
    this.bulletImg = loadImage('./assets/bullet-small.png');
    this.carWreckImgs = [
      this.carWreck1,
      this.carWreck2,
      this.carWreck3,
      this.carWreck4,
    ];
    this.background.preload();
    this.road.preload();
    // this.bullet.preload();
    this.sonarEmitter1 = new SonarEmitter(0, this.trafficLanes[0], 0);
    this.sonarEmitter2 = new SonarEmitter(0, this.trafficLanes[1], 1);
    this.sonarEmitter3 = new SonarEmitter(0, this.trafficLanes[2], 2);
    this.sonarEmitter4 = new SonarEmitter(0, this.trafficLanes[3], 3);
    this.sonarEmitter5 = new SonarEmitter(0, this.trafficLanes[4], 4);
    this.sonarEmitters = [
      this.sonarEmitter1,
      this.sonarEmitter2,
      this.sonarEmitter3,
      this.sonarEmitter4,
      this.sonarEmitter5,
    ];
    this.sonarEmitters.forEach(emitter => emitter.preload());
    this.player.preload();
    this.civilian1.preload();
    this.civilian2.preload();
    this.police.preload();
  }

  setup() {
    this.player.setup();
    this.civilian1.setup();
    this.civilian2.setup();
    this.police.setup();
    this.activeVehicles = [
      this.player,
      this.civilian1,
      this.civilian2,
      this.police,
    ];
    this.activeCivilians = [this.player, this.civilian1, this.civilian2];
    this.activePolice = [this.police];
    this.activeVehicles.forEach(vehicle => {
      vehicle.objectID = this.objectID;
      this.objectID += 1;
    });
    this.sonarEmitters.forEach(emitter => emitter.setup());
  }

  spawnCivilian() {
    let randomIndex = Math.floor(
      Math.random() * Object.keys(civilianCarTypes).length
    );
    this.newVehicle = new Civilian(
      GAMEWIDTH,
      this.trafficLanes[Math.floor(Math.random() * this.trafficLanes.length)],
      civilianCarTypes[Object.keys(civilianCarTypes)[randomIndex]].imgPath,
      civilianCarTypes[Object.keys(civilianCarTypes)[randomIndex]]
    );
    this.newVehicle.objectID = this.objectID;
    if (this.newVehicle.objectID === this.objectID) {
      // checks objectID to avoid re-initializing previously spawned new vehicles
      this.newVehicle.preload();
      this.newVehicle.setup(); // ? this setup may have caused problems?
      this.activeVehicles.push(this.newVehicle);
      this.activeCivilians.push(this.newVehicle);
    }
    this.objectID += 1;
  }

  spawnPolice() {
    this.police = new Police(
      -200,
      300,
      policeCarTypes['Paddy Wagon'].imgPath,
      policeCarTypes['Paddy Wagon']
    );
    this.police.preload();
    this.police.setup();
    this.activeVehicles.push(this.police);
    this.activePolice.push(this.police);
  }

  draw() {
    clear();
    this.background.draw();
    this.road.draw();
    this.activeVehicles.sort((a, b) => a.y - b.y);
    if (frameCount > 180 && frameCount % 200 === 0) {
      // every 3.3 seconds
      this.spawnCivilian();
    }
    if (frameCount % 600 === 0) {
      if (!this.activePolice.length) {
        this.spawnPolice();
      }
    }
    // if (frameCount > 1200 && frameCount % 120 === 0) {
    //   // every 2 seconds
    //   this.spawnCivilian();
    // }
    this.activeVehicles.forEach((subjectVehicle, subjectIndex) => {
      // remove vehicles located off left side of the canvas
      if (
        subjectVehicle.x + subjectVehicle.img.width < -250 &&
        subjectVehicle.objectID !== 1
      ) {
        this.activeVehicles.splice(subjectIndex, 1);
        this.activeCivilians.splice(subjectIndex, 1);
      }
      if (subjectVehicle.health <= 0) {
        if (subjectVehicle.isPolice) {
          this.activePolice.splice(subjectIndex, 1);
        }
        subjectVehicle.img = this.carWreckImgs[subjectVehicle.carType.wreckNum];
        subjectVehicle.wrecked = true;
      }
      subjectVehicle.draw();
    });
    if (mouseIsPressed && !this.player.wrecked) {
      if (frameCount % 10 === 0) {
        this.player.updateAim(mouseX, mouseY);
        let newBullet = new Bullet(
          this.player.x + this.player.img.width / 2,
          this.player.y + this.player.img.height / 2,
          this.player.aimAngle,
          1,
          30,
          './assets/bullet-small.png'
        );
        newBullet.preload();
        this.bullets.push(newBullet);
      }
    }
    if (frameCount % 900 === 0) {
      this.activePolice.forEach((police, index) => {
        if (police.health <= 0) {
          this.activePolice.splice(index, 1);
        }
      });
    }

    push();
    fill('black');
    this.bullets.forEach((bullet, index) => {
      if (
        // removes out of bounds bullets
        bullet.x > GAMEWIDTH + CANVASBUFFER ||
        bullet.x < GAMEXBASIS + CANVASBUFFER ||
        bullet.y < GAMEYBASIS + CANVASBUFFER ||
        bullet.y > GAMEHEIGHT + CANVASBUFFER
      ) {
        this.bullets.splice(index, 1);
      }
      bullet.draw(index);
    });
    pop();
    this.sonarEmitters.forEach(emitter => emitter.draw());
    createHTML();
    updateMurderCount();
  }
}

function isCollision(subject, object) {
  // look for a way better than O(n**2) to check for collisions.
  if (subject.objectID === object.objectID) {
    return false;
  }
  if (
    subject.targetX + subject.img.width < object.x ||
    object.x + subject.img.width < subject.targetX
  ) {
    return false;
  }
  if (
    subject.targetY + (subject.img.height - 30) >
      object.y + object.img.height ||
    object.y + (subject.img.height - 30) > subject.targetY + object.img.height
  ) {
    return false;
  }
  return true;
}
