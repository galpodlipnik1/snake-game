import { Server } from "socket.io";
import { initGame, initSingleGame, gameLoop, singleGameLoop, getUpdatedVelocity } from "./game.js";
import { makeid } from "./util.js";
import { FRAME_RATE } from "./constants.js";

const io = new Server(3000, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});




const state = {};
const clientRooms = {};

const singleClientRooms = {};
const singleState = {};

io.on('connection', client => {

  const handleJoinGame = (roomName) => {
    console.log(`[${new Date().toLocaleString()}] joined`, client.id);
    client.emit('gameCode', roomName);
    const room = io.sockets.adapter.rooms.get(roomName);

    let allUsers;
    if (room) {
        allUsers = room;
    } else {
        console.log(`[${new Date().toLocaleString()}] room not found`);
    }

    let numClients = 0;
    if (allUsers) {
        numClients = allUsers.size;
    } else {
        console.log(`[${new Date().toLocaleString()}] no users`);
    }

    if (numClients === 0) {
      client.emit('unknownGame');
      return;
    } else if (numClients > 1) {
      client.emit('tooManyPlayers');
      return;
    }

    clientRooms[client.id] = roomName;

    client.join(roomName);
    client.number = 2;
    client.emit('init', 2);

    io.sockets.in(roomName).emit('gameStart');

    startGameInterval(roomName);
  }

  const handleNewSingleGame = () => {
    console.log(`[${new Date().toLocaleString()}] new game`, client.id);
    
    let roomName = makeid(5);
    singleClientRooms[client.id] = roomName;

    singleState[roomName] = initSingleGame();

    client.join(roomName);
    client.number = 1;
    client.emit('init', 1);

    io.sockets.in(roomName).emit('singleGameStart');

    startSingleGameInterval(roomName);
  };

  const handleNewGame = () => {
    console.log(`[${new Date().toLocaleString()}] new game`, client.id);
    let roomName = makeid(5);
    clientRooms[client.id] = roomName;
    client.emit('gameCode', roomName);

    state[roomName] = initGame();

    client.join(roomName);
    client.number = 1;
    client.emit('init', 1);
  }
  const handleKeyDownSingle = (keyCode) => {
    const roomName = singleClientRooms[client.id];
    if(!roomName) {
      return;
    }

    try {
      keyCode = parseInt(keyCode);
    } catch (error) {
      console.log(e);
      return;
    }

    const vel = getUpdatedVelocity(keyCode);

    if(vel) {
      singleState[roomName].players[0].vel = vel;
    }
  };

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
      state[roomName].players[client.number - 1].vel =vel;
    }
  }

  const handleLobbys = () => {
    const lobbys = [];
    for (let key in clientRooms) {
      const room = io.sockets.adapter.rooms.get(clientRooms[key]);
      let numClients = 0;
      if (room) {
        numClients = room.size;
      }
      lobbys.push({gameCode: clientRooms[key], players: numClients});
    }
    console.log(`[${new Date().toLocaleString()}] emited lobbys`, lobbys.length);
    client.emit('lobbys', JSON.stringify(lobbys));
  };
  
  client.on('getLobbys', handleLobbys);
  client.on('keydown', handleKeydown);
  client.on('singleKeyDown', handleKeyDownSingle);
  client.on('newGame', handleNewGame);
  client.on('joinGame', handleJoinGame);
  client.on('newSingleGame', handleNewSingleGame);
});

const startSingleGameInterval = (roomName) => {
  const intervalId = setInterval(() => {
    const winner = singleGameLoop(singleState[roomName]);
    if(!winner){
      emitSingleGameState(roomName, singleState[roomName]);
    } else {
      emitSingleGameOver(roomName, winner);
      singleState[roomName] = null;
      clearInterval(intervalId);
    }
  }, 1000 / FRAME_RATE);
}

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

const emitSingleGameState = (room, gameState) => {
  io.sockets.in(room).emit('singleGameState', JSON.stringify(gameState));
}

const emitGameState = (room, gameState) => {
  io.sockets.in(room).emit('gameState', JSON.stringify(gameState));
}

const emitSingleGameOver = (room, winner) => {
  for(let key in singleClientRooms) {
    if(singleClientRooms[key] === room) {
      delete singleClientRooms[key];
    }
  }
  const finnalState = singleState[room];
  
  io.sockets.in(room).emit('singleGameOver', JSON.stringify({ winner, finnalState }));
}

const emitGameOver = (room, winner) => {
  for (let key in clientRooms) {
    if (clientRooms[key] === room) {
      delete clientRooms[key];
    }
  }
  const finnalState = state[room];
  io.sockets.in(room).emit('gameOver', JSON.stringify({ winner, finnalState }));
}

setInterval(() => {
  for(let key in clientRooms) {
    const room = io.sockets.adapter.rooms.get(clientRooms[key]);
    let numClients = 0;
    if (room) {
      numClients = room.size;
    }
    if (numClients === 0) {
      delete clientRooms[key];
    }
  }
}, 10000);
