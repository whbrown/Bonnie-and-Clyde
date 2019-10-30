/* eslint no-undef: 0, no-unused-vars: 0, dot-notation: 0 */

class Game {
  constructor() {
    this.road = new Road();
    this.background = new Background();
    this.bullets = [];
    this.player = new Player(100, 350, './src/game/assets/car3.png');
    this.civilian1 = new Civilian(
      100,
      400,
      civilianCarTypes['SUV'].imgPath,
      civilianCarTypes['SUV']
    );
    this.civilian2 = new Civilian(
      680,
      450,
      civilianCarTypes['Buick'].imgPath,
      civilianCarTypes['Buick']
    );
    this.objectID = 1;
    this.roadMaxY = 500;
    this.roadMinY = 300;
  }

  preload() {
    this.background.preload();
    this.road.preload();
    // this.bullet.preload();
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
    this.road.draw();
    this.activeVehicles.sort((a, b) => a.y - b.y);
    if (frameCount > 240 && frameCount % 200 === 0) {
      let randomIndex = Math.floor(
        Math.random() * Object.keys(civilianCarTypes).length
      );
      console.log(civilianCarTypes[Object.keys(civilianCarTypes)[randomIndex]]);
      this.newVehicle = new Civilian(
        GAMEWIDTH,
        Math.floor(
          Math.random() * (this.roadMaxY - this.roadMinY + 1) + this.roadMinY
        ),
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
    this.activeVehicles.forEach((subjectVehicle, subjectIndex) => {
      // remove vehicles located off left side of the canvas
      if (
        subjectVehicle.x + subjectVehicle.img.width < 0 &&
        subjectVehicle.objectID !== 1
      ) {
        this.activeVehicles.splice(subjectIndex, 1);
        this.activeCivilians.splice(subjectIndex, 1);
      }

      subjectVehicle.draw();
    });
    if (mouseIsPressed) {
      if (frameCount % 10 === 0) {
        this.player.updateAim(mouseX, mouseY);
        this.bullets.push(
          new Bullet(
            this.player.x + this.player.img.width / 2,
            this.player.y + this.player.img.height / 2,
            this.player.aimAngle,
            1
          )
        );
      }
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
      bullet.draw();
    });
    pop();
  }
}

function isCollision(subject, targets) {
  if (subject.targetY < 255) {
    return true;
  }
  // look for a way better than O(n**2) to check for collisions.
  return targets.some(object => {
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
  });
}
