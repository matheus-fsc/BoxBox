const express = require('express');
const WebSocket = require('ws');
const cors = require('cors');  // Biblioteca para habilitar CORS
const app = express();
const port = 3001;

// Usar CORS para permitir conexões do localhost:3000
app.use(cors({
    origin: 'http://localhost:3000/game',  // Permite conexões do frontend rodando na porta 3000
    methods: ['GET', 'POST'],
}));

// Servir os arquivos estáticos (onde seu frontend Phaser está)
app.use(express.static('public'));

const wss = new WebSocket.Server({ noServer: true });

// Armazenar os jogadores conectados
let players = {};

// Quando um jogador se conecta
wss.on('connection', (ws) => {
    console.log("Novo jogador conectado");

    // Gerar um ID único para o jogador
    const playerId = Date.now();

    // Enviar uma mensagem para o jogador com o seu ID
    ws.send(JSON.stringify({ type: 'setId', playerId }));

    // Exibir no terminal quando um jogador se conecta
    console.log(`Jogador ${playerId} conectado`);

    // Quando o servidor receber dados do jogador
    ws.on('message', (message) => {
        const data = JSON.parse(message);

        // Atualiza a posição do jogador
        if (data.type === 'updatePosition') {
            players[data.id] = { x: data.x, y: data.y };
        }

        // Enviar os dados de todos os jogadores para todos os clientes conectados
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'players', players }));
            }
        });
    });

    // Quando o jogador se desconectar
    ws.on('close', () => {
        console.log(`Jogador ${playerId} desconectado`);
        delete players[playerId]; // Remover jogador da lista de players
    });
});

// Iniciar o servidor HTTP
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
