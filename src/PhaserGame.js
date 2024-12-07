import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const PhaserGame = () => {
  const gameContainer = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
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
    };

    const game = new Phaser.Game(config);

    function preload() {
      this.load.image('sky', 'https://labs.phaser.io/assets/skies/space3.png');
      this.load.image('ball', 'https://labs.phaser.io/assets/sprites/balls/blue.png');
    }

    function create() {
      this.add.image(400, 300, 'sky');

      const ball = this.physics.add.sprite(400, 300, 'ball');
      ball.setBounce(0.8);
      ball.setCollideWorldBounds(true);
      ball.setVelocity(200, 200);
    }

    function update() {
      // Atualizações contínuas do jogo
    }

    // Limpa o Phaser ao desmontar o componente
    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={gameContainer} style={{ width: '800px', height: '600px' }} />;
};

export default PhaserGame;
