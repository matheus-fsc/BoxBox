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

        this.speedBoost = 600;

        this.player.setScale(1)

        // Criar animações
        this.createAnimations();
    }

    // Função para criar animações
    createAnimations() {
        this.scene.anims.create({
            key: 'walk',  // Nome da animação de andar
            frames: this.scene.anims.generateFrameNumbers('player', { start: 4, end: 9 }), // Quadros de 0 a 3 (para esquerda e direita)
            frameRate: 10,  // Taxa de quadros por segundo
            repeat: -1  // Repetir a animação indefinidamente
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
    update(cursors) {
        // Verifique se o player foi criado corretamente
        if (!this.player) {
            console.error('O player não foi inicializado corretamente!');
            return;
        }

        let isShiftPressed = cursors.shift.isDown ? true : false; // 100ms para detectar o pressionamento

        // Se Shift estiver pressionado, use a velocidade aumentada
        let currentSpeed = isShiftPressed ? this.speedBoost : this.speed;

        let velocityX = 0;
        let velocityY = 0;

        if (cursors.left.isDown) {
            velocityX = -currentSpeed;  // Movimento para a esquerda
            this.player.anims.play(isShiftPressed ? 'run' : 'walk', true);  // Reproduzir animação "walk"
            this.player.setFlipX(true);  // Inverter horizontalmente (flip no eixo X)
        } else if (cursors.right.isDown) {
            velocityX = currentSpeed;  // Movimento para a direita
            this.player.anims.play(isShiftPressed ? 'run' : 'walk', true);  // Reproduzir animação "walk"
            this.player.setFlipX(false);  // Voltar para a posição normal (sem flip)
        }

        // Movimentação vertical (cima/baixo)
        if (cursors.up.isDown) {
            velocityY = -currentSpeed;  // Movimento para cima
            this.player.anims.play(isShiftPressed ? 'run' : 'walk', true);  // Reproduzir animação "walk"
        } else if (cursors.down.isDown) {
            velocityY = currentSpeed;  // Movimento para baixo
            this.player.anims.play(isShiftPressed ? 'run' : 'walk', true);  // Reproduzir animação "walk"
        }

        // Aplicar as velocidades ao sprite
        this.player.setVelocityX(velocityX);
        this.player.setVelocityY(velocityY);

        // Se o player não estiver se movendo, reproduz a animação de idle
        if (velocityX === 0 && velocityY === 0) {
            this.player.anims.play('idle', true);  // Reproduzir animação "idle"
            this.isRunning = false;
        }
    }
}
