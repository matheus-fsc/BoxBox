import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  init(data) {
    this.color = data.color;
  }

  preload() {
    const colors = ['red', 'blue', 'green', 'yellow'];
    colors.forEach((cor) => {
      this.load.spritesheet('player-' + cor, 'assets/' + cor + 'Dino.png', { frameWidth: 24, frameHeight: 24 });
    });

    this.load.spritesheet('player', 'assets/' + this.color + 'Dino.png', { frameWidth: 24, frameHeight: 24 });
    this.load.image("tiles", "assets/tiles.png");
    this.load.tilemapTiledJSON("map", "assets/map.json");
  }

  create() {
    this.scene.start("game", { color: this.color });
  }
}