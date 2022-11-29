import { Server } from "socket.io";
import { initGame, gameLoop, getUpdatedVelocity } from "./game.js";
import { makeid } from "./util.js";
import { FRAME_RATE } from "./constants.js";

const io = new Server(3000, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

const state = {};
const clientRooms = {};

io.on('connection', client => {

  const handleJoinGame = (roomName) => {
    const room = io.sockets.adapter.rooms.get(roomName);

    let allUsers;
    if (room) {
        allUsers = room;
    } else {
        console.log('room not found');
    }

    let numClients = 0;
    if (allUsers) {
        numClients = allUsers.size;
    } else {
        console.log('no users');
    }

    if (numClients === 0) {
      client.emit('unknownCode');
      return;
    } else if (numClients > 1) {
      client.emit('tooManyPlayers');
      return;
    }

    clientRooms[client.id] = roomName;

    client.join(roomName);
    client.number = 2;
    client.emit('init', 2);
    
    startGameInterval(roomName);
  }

  const handleNewGame = () => {
    let roomName = makeid(5);
    clientRooms[client.id] = roomName;
    client.emit('gameCode', roomName);

    state[roomName] = initGame();

    client.join(roomName);
    client.number = 1;
    client.emit('init', 1);
  }

  const handleKeydown = (keyCode) => {
    const roomName = clientRooms[client.id];
    if (!roomName) {
      return;
    }
    try {
      keyCode = parseInt(keyCode);
    } catch(e) {
      console.error(e);
      return;
    }

    const vel = getUpdatedVelocity(keyCode);

    if (vel) {
      state[roomName].players[client.number - 1].vel = vel;
    }
  }

  client.on('keydown', handleKeydown);
  client.on('newGame', handleNewGame);
  client.on('joinGame', handleJoinGame);
});

const startGameInterval = (roomName) => {
    const intervalId = setInterval(() => {
        const winner = gameLoop(state[roomName]);
        if (!winner) {
          emitGameState(roomName, state[roomName])
        } else {
          emitGameOver(roomName, winner);
          state[roomName] = null;
          clearInterval(intervalId);
        }
    }, 1000 / FRAME_RATE);
}

const emitGameState = (room, gameState) => {
  io.sockets.in(room)
    .emit('gameState', JSON.stringify(gameState));
}

const emitGameOver = (room, winner) => {
  io.sockets.in(room)
    .emit('gameOver', JSON.stringify({ winner }));
}

