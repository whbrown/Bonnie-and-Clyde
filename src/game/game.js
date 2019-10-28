/* eslint no-undef: 0, no-unused-vars: 0 */

class Game {
  constructor() {
    this.player = new Player(100, 250, './src/game/assets/car3.png');
    this.background = new Background();
    this.civilian1 = new NPC(100, 400, './src/game/assets/car4.png');
    this.civilian2 = new NPC(680, 200, './src/game/assets/car5.png');
    this.civilianCarAssets = [
      './src/game/assets/car4.png',
      './src/game/assets/car5.png',
      './src/game/assets/car6.png',
      './src/game/assets/car7.png',
      './src/game/assets/car8.png',
    ];
    this.ID = 1;
    this.maxY = 400;
    this.minY = 200;
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
      vehicle.ID = this.ID;
      this.ID += 1;
    });
  }

  draw() {
    clear();
    this.background.draw();
    this.activeVehicles.sort((a, b) => a.y - b.y);
    // look for a way better than O(n**2) to check for collisions.
    // this.activeVehicles.filter((vehicle) => {
    //   for (let otherVehicle of this.activeVehicles)
    // });
    // console.log('game draw');
    if (frameCount > 240 && frameCount % 200 === 0) {
      let randomIndex = Math.floor(
        Math.random() * this.civilianCarAssets.length
      );
      this.newVehicle = new NPC(
        720,
        Math.floor(Math.random() * (this.maxY - this.minY + 1) + this.minY),
        this.civilianCarAssets[randomIndex]
      );
      this.newVehicle.ID = this.ID;
      if (this.newVehicle.ID === this.ID) {
        // check ID to avoid re-initializing previously spawned new vehicles
        this.newVehicle.preload();
        // this.newVehicle.setup();
        this.activeVehicles.push(this.newVehicle);
        this.activeCivilians.push(this.newVehicle);
      }
      this.ID += 1;
    }
    this.activeVehicles.forEach((vehicle, index) => {
      if (vehicle.x + vehicle.img.width < 0 && vehicle.ID !== 1) {
        this.activeVehicles.splice(index, 1);
        this.activeCivilians.splice(index, 1);
      }
      vehicle.draw();
    });
    // console.log(this.ID);
  }
}
