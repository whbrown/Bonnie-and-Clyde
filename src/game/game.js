/* eslint no-undef: 0, no-unused-vars: 0, dot-notation: 0 */

function isCollision(subject, targets) {
  return targets.some(object => {
    if (subject.objectID === object.objectID) {
      return false;
    }
    if (
      subject.x + subject.img.width < object.x ||
      object.x + subject.img.width < subject.x
    ) {
      return false;
    }
    if (
      subject.y + (subject.img.height - 30) > object.y + object.img.height ||
      object.y + (subject.img.height - 30) > subject.y + object.img.height
    ) {
      return false;
    }
    return true;
  });
}

class Game {
  constructor() {
    this.background = new Background();
    this.player = new Player(100, 350, './src/game/assets/car3.png');
    this.civilian1 = new Civilian(100, 400, carTypes['SUV'].imgPath);
    this.civilian2 = new Civilian(680, 450, carTypes['Buick'].imgPath);
    this.objectID = 1;
    this.roadMaxY = 500;
    this.roadMinY = 300;
  }

  preload() {
    this.background.preload();
    this.player.preload();
    this.civilian1.preload();
    this.civilian2.preload();
  }

  setup() {
    this.player.setup();
    this.civilian1.setup();
    this.civilian2.setup();
    this.activeVehicles = [this.player, this.civilian1, this.civilian2];
    this.activeCivilians = [this.civilian1, this.civilian2];
    this.activeVehicles.forEach(vehicle => {
      vehicle.objectID = this.objectID;
      this.objectID += 1;
    });
  }

  draw() {
    clear();
    this.background.draw();
    this.activeVehicles.sort((a, b) => a.y - b.y);
    if (frameCount > 240 && frameCount % 200 === 0) {
      let randomIndex = Math.floor(
        Math.random() * Object.keys(carTypes).length
      );
      this.newVehicle = new Civilian(
        WIDTH,
        Math.floor(
          Math.random() * (this.roadMaxY - this.roadMinY + 1) + this.roadMinY
        ),
        carTypes[Object.keys(carTypes)[randomIndex]].imgPath
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
    this.activeVehicles.forEach((subjectVehicle, subjectIndex) => {
      // remove vehicles located off left side of the canvas
      if (
        subjectVehicle.x + subjectVehicle.img.width < 0 &&
        subjectVehicle.objectID !== 1
      ) {
        this.activeVehicles.splice(subjectIndex, 1);
        this.activeCivilians.splice(subjectIndex, 1);
      }

      // look for a way better than O(n**2) to check for collisions.
      // this.activeVehicles.forEach((targetVehicle, targetIndex) => {
      //   if (subjectIndex !== targetIndex) {
      //     if (isCollision(subjectVehicle, targetVehicle)) {
      //     }
      //   }
      // });
      subjectVehicle.draw();
    });
  }
}
