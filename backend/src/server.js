
const { WebSocketServer } = require('ws'); // Importa o WebSocketServer do pacote 'ws'
const dotenv = require('dotenv');

dotenv.config();

const wss = new WebSocketServer({ port: process.env.PORTA || 8080 });

wss.on("connection", (ws) => {
    console.log("> Novo Usuário Conectado!");

    ws.on("error", (error) => {
        console.error("Erro na conexão WebSocket:", error);
    });

    ws.on("message", (data) => {
        wss.clients.forEach((client) => client.send(data.toString()))
    })
});
