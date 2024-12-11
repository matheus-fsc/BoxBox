import Phaser from "phaser";
import Player from "../sprites/Player";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
    this.socket = null;
    this.playerId = null;
  }

  create() {
    // Conectar ao servidor WebSocket
    this.socket = new WebSocket('ws://localhost:3001');

    // Aguarde a conexão ser aberta antes de enviar qualquer mensagem
    this.socket.onopen = () => {
      console.log("Conectado ao servidor");

      // Enviar a mensagem com a posição do player
      this.socket.send(JSON.stringify({
        type: 'updatePosition',
        id: this.playerId,
        x: this.player.player.x,
        y: this.player.player.y
      }));
    };

    // Receber dados do servidor
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === 'setId') {
        // Receber o ID único do jogador
        this.playerId = message.playerId;
      }

      if (message.type === 'players') {
        // Atualizar a posição de todos os jogadores
        this.updatePlayers(message.players);
      }
    };

    // Carregar o mapa do arquivo JSON
    const map = this.make.tilemap({ key: 'map' });

    // Adicionar o tileset ao mapa
    const tileset = map.addTilesetImage('tiles');

    // Criar camadas do mapa
    const grass = map.createLayer('grass', tileset, 0, 0);
    const trees = map.createLayer('trees', tileset, 0, 0);

    // Definir colisão nas camadas
    grass.setCollisionByProperty({ collides: true });
    trees.setCollisionByProperty({ collides: true });

    // Criar o player
    this.player = new Player(this, 400, 300, 'player');

    // Definindo as teclas de controle
    this.cursors = this.input.keyboard.createCursorKeys();

    // Habilitar física para o player
    this.physics.world.enable(this.player.player);

    // Adicionar colisão entre o player e as camadas
    this.physics.add.collider(this.player.player, grass);
    this.physics.add.collider(this.player.player, trees);

    // Definir o depth da camada 'trees'
    trees.setDepth(1);

    // Definir o depth do player
    this.player.player.setDepth(0);

    // Definir limites da câmera
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(2);

    // Enviar a posição do player assim que o WebSocket estiver aberto
    this.sendPosition();
  }

  update() {
    // Atualiza a posição do player
    if (this.player) {
      this.player.update(this.cursors);
      this.sendPosition();
    } else {
      console.error("Player não foi criado corretamente.");
    }
  }

  sendPosition() {
    // Verificar se o WebSocket está aberto antes de enviar os dados
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({
        type: 'updatePosition',
        id: this.playerId,
        x: this.player.player.x,
        y: this.player.player.y
      }));
    } else {
      // Caso o WebSocket ainda não esteja aberto, aguarde o evento 'onopen'
      this.socket.onopen = () => {
        this.socket.send(JSON.stringify({
          type: 'updatePosition',
          id: this.playerId,
          x: this.player.player.x,
          y: this.player.player.y
        }));
      };
    }
  }

  updatePlayers(players) {
    // Inicializar ou garantir que `otherPlayers` existe
    if (!this.otherPlayers) {
      this.otherPlayers = {};
    }

    // Atualizar ou criar sprites para todos os jogadores recebidos do servidor
    Object.keys(players).forEach((id) => {


      if (id === this.playerId) {
        // Ignorar o jogador local (já gerenciado por `this.player`)
        return;
      }



      const playerData = players[id];

      if (!this.otherPlayers[id]) {
        // Criar sprite para um novo jogador
        if (playerData.x !== undefined && playerData.y !== undefined) {
          const newPlayer = this.add.sprite(playerData.x, playerData.y, 'player');
          this.otherPlayers[id] = newPlayer;
        }
      } else {
        // Atualizar a posição do jogador existente
        this.otherPlayers[id].setPosition(playerData.x, playerData.y);
      }

      if (this.otherPlayers[this.playerId]) {
        this.otherPlayers[this.playerId].destroy();
        delete this.otherPlayers[this.playerId];
      }
      if (this.otherPlayers['null']) {
        this.otherPlayers['null'].destroy();
        delete this.otherPlayers['null'];
      }
    });


    // Remover jogadores desconectados (sprites que não estão mais no `players`)
    Object.keys(this.otherPlayers).forEach((id) => {
      if (!players[id]) {
        this.otherPlayers[id].destroy(); // Remover o sprite
        delete this.otherPlayers[id]; // Remover do objeto
      }
    });
  }





}
