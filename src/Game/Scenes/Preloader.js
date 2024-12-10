import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  preload() {
    this.load.image("tiles", "assets/tiles.png");
    this.load.tilemapTiledJSON("map", "assets/map2.json");
  }

  create() {
    this.scene.start("game");
  }
}