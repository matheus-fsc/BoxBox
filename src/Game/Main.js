import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import Game from "./Scenes/Game";
import Preloader from "./Scenes/Preloader";

const Main = () => {
  const gameContainer = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 }
        }
      },
      scene: [Preloader, Game],
      parent: gameContainer.current
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={gameContainer} />;
};

export default Main;