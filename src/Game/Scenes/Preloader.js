import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  preload() {
    this.load.image("tiles", "assets/tiles.png");
    this.load.tilemapTiledJSON("map", "assets/map.json");
    this.load.spritesheet('player', 'assets/blueDino.png', { frameWidth: 24, frameHeight: 24 });
  }

  create() {
    this.scene.start("game");
  }
}