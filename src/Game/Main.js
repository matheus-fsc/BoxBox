import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import Game from "./Scenes/Game";
import Preloader from "./Scenes/Preloader";
import './Style/Global.css';

const Main = () => {
  const gameContainer = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 }
        }
      },
      scene: [Preloader, Game],
      parent: gameContainer.current,
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
      }
    };

    const game = new Phaser.Game(config);

    // Atualiza o tamanho do jogo quando a tela for redimensionada
    const handleResize = () => {
      game.scale.resize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      game.destroy(true);
      window.removeEventListener("resize", handleResize);  // Limpar o evento quando o componente for desmontado
    };
  }, []);

  return <div ref={gameContainer} style={{ width: '100%', height: '100%' }} />;
};

export default Main;