import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import './Style/Global.css';

const PhaserGame = () => {
  const gameContainer = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: '100%',
      height: '100%',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false,
        },
      },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
      parent: gameContainer.current, // Renderiza o Phaser no container
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    const game = new Phaser.Game(config);

    function preload() {
      this.load.image('sky', 'https://labs.phaser.io/assets/skies/space3.png');
      this.load.image('ball', 'https://labs.phaser.io/assets/sprites/balls/blue.png');
    }

    function create() {
      this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'sky');

      const ball = this.physics.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'ball');
      ball.setBounce(0.8);
      ball.setCollideWorldBounds(true);
      ball.setVelocity(200, 200);
    }

    function update() {
      // Atualizações do jogo
    }

    const resize = () => {
      game.scale.resize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      game.destroy(true);
    };
  }, []);

  return (
    <div ref={gameContainer} id="phaser-game"></div>
  );
};

export default PhaserGame;