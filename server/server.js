const express = require('express');
const WebSocket = require('ws');
const http = require('http'); // Importar o módulo HTTP
const cors = require('cors');

const app = express();
const port = 3001;

// Usar CORS para permitir conexões do frontend
app.use(cors({
    origin: 'http://localhost:3000', // Ajuste para permitir conexões do frontend
    methods: ['GET', 'POST'],
}));

// Servir arquivos estáticos, se necessário
app.use(express.static('public'));

// Criar o servidor HTTP
const server = http.createServer(app);

// Configurar o WebSocket Server para usar o mesmo servidor HTTP
const wss = new WebSocket.Server({ server });

// Armazenar os jogadores conectados
let players = {};

// Quando um jogador se conecta
wss.on('connection', (ws) => {
    console.log("Novo jogador conectado");

    const playerId = Date.now(); // Gerar ID único
    ws.send(JSON.stringify({ type: 'setId', playerId }));

    console.log(`Jogador ${playerId} conectado`);

    ws.on('message', (message) => {
        const data = JSON.parse(message);

        if (data.type === 'updatePosition') {
            players[data.id] = { x: data.x, y: data.y };
            console.log(data.x, data.y)
        }

        // Enviar os dados de todos os jogadores para todos os clientes conectados
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'players', players }));
            }
        });
    });

    ws.on('close', () => {
        console.log(`Jogador ${playerId} desconectado`);
        delete players[playerId];
    });
});

// Iniciar o servidor HTTP e WebSocket
server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
