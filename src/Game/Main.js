import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import Game from "./Scenes/Game";
import Preloader from "./Scenes/Preloader";


const Main = () => {
  const gameContainer = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
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
      autoCenter: true,  // Garantir que o jogo fique centralizado
    };

    const game = new Phaser.Game(config);

    // Atualiza o tamanho do jogo quando a tela for redimensionada
    const handleResize = () => {
      game.scale.resize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Atualiza o tamanho do jogo quando a tela for redimensionada
    const handleResize = () => {
      game.scale.resize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      game.destroy(true);
      window.removeEventListener("resize", handleResize);  // Limpar o evento quando o componente for desmontado
      window.removeEventListener("resize", handleResize);  // Limpar o evento quando o componente for desmontado
    };
  }, []);

  return <div ref={gameContainer} style={{ margin: 0, padding: 0, overflow: 'hidden' }} />;
};

export default Main;

