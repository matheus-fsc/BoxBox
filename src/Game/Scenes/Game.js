import Phaser from "phaser";
import Player from "../sprites/Player";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
    this.socket = null;
    this.playerId = null;
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("tileset_name_in_tiled", "tiles");

    const layer = map.createLayer("layer_name_in_tiled", tileset, 0, 0);

    //this.add.text(0, 0, "Hello World", { font: "40px Impact" });
  }
}