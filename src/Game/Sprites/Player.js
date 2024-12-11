import Phaser from "phaser";

export default class Player {
    constructor(scene, x, y, texture) {
        this.scene = scene;

        // Verifique se `scene.physics` existe antes de chamar o `add.sprite`
        if (!this.scene.physics) {
            console.error('Física não inicializada!');
            return;
        }

        // Criar o sprite do player
        this.player = this.scene.physics.add.sprite(x, y, texture);
        this.player.setCollideWorldBounds(true); // Impede que o player saia da tela

        this.speed = 200;

        this.speedBoost = 400;

        this.player.setScale(1)

        // Criar animações
        this.createAnimations();

        // No construtor ou em uma função de inicialização
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.wasd = {
            up: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };
    }

    // Função para criar animações
    createAnimations() {
        this.scene.anims.create({
            key: 'walk',  // Nome da animação de andar
            frames: this.scene.anims.generateFrameNumbers('player', { start: 4, end: 9 }), // Quadros de 0 a 3 (para esquerda e direita)
            frameRate: 10,  // Taxa de quadros por segundo
            repeat: -1
        });

        this.scene.anims.create({
            key: 'run',  // Nome da animação de andar
            frames: this.scene.anims.generateFrameNumbers('player', { start: 17, end: 23 }), // Quadros de 0 a 3 (para esquerda e direita)
            frameRate: 20,  // Taxa de quadros por segundo
            repeat: -1  // Repetir a animação indefinidamente
        });

        this.scene.anims.create({
            key: 'idle',  // Nome da animação de inatividade (quando o player está parado)
            frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 3 }),  // Usar o primeiro quadro da animação
            frameRate: 10  // Taxa de quadros
        });
    }


    // Função update para movimento do player
    update() {
        let velocityX = 0;
        let velocityY = 0;

        this.speed = this.cursors.shift.isDown ? this.speedBoost : 200;

        if (this.cursors.left.isDown || this.wasd.left.isDown) {
            velocityX = -this.speed;
            this.player.setFlipX(true);
        } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
            velocityX = this.speed;
            this.player.setFlipX(false);
        }

        if (this.cursors.up.isDown || this.wasd.up.isDown) {
            velocityY = -this.speed;
        } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
            velocityY = this.speed;
        }

        // Normalizar a velocidade na diagonal
        if (velocityX !== 0 && velocityY !== 0) {
            velocityX *= Math.SQRT1_2; // Math.SQRT1_2 é equivalente a 1/√2
            velocityY *= Math.SQRT1_2;
        }

        this.player.setVelocity(velocityX, velocityY);

        // Atualizar animação com base na velocidade
        if (velocityX !== 0 || velocityY !== 0) {
            if (this.cursors.shift.isDown) {
                this.player.anims.play('run', true);
            } else {
                this.player.anims.play('walk', true);
            }
        } else {
            this.player.anims.play('idle', true);
        }
    }
}