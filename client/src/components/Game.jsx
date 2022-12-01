import React, { useState } from 'react';
import { io } from 'socket.io-client';

const Game = () => {
  const [gameScreenState, setGameScreenState] = useState(false);
  const socket = io('https://localhost:3000', {
    withCredentials: true,
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
    credentials: true
  });

  const BG_COLOR = '#231f20';
  const SNAKE_COLOR = '#c2c2c2';
  const FOOD_COLOR = '#e66916';

  window.onload = () => {
    const newGameButton = document.getElementById('newGameButton');
    const joinGameButton = document.getElementById('joinGameButton');
    const gameCodeInput = document.getElementById('gameCodeInput');
    const gameCodeDisplay = document.getElementById('gameCodeDisplay');
    const newGame = () => {
      socket.emit('newGame');
      setGameScreenState(true);
      init();
    };

    const joinGame = () => {
      const code = gameCodeInput.value;
      socket.emit('joinGame', code);
      setGameScreenState(true);
      init();
    };

    newGameButton.addEventListener('click', newGame);
    joinGameButton.addEventListener('click', joinGame);

    let canvas, ctx;
    let playerNumber;
    let gameActive = false;

    const init = () => {
      canvas = document.getElementById('canvas');
      ctx = canvas.getContext('2d');

      canvas.width = canvas.height = 600;

      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      document.addEventListener('keydown', keydown);

      gameActive = true;
    };

    const keydown = (e) => {
      socket.emit('keydown', e.keyCode);
    };

    const paintGame = (state) => {
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const food = state.food;
      const gridsize = state.gridsize;
      const size = canvas.width / gridsize;

      ctx.fillStyle = FOOD_COLOR;
      ctx.fillRect(food.x * size, food.y * size, size, size);

      paintPlayer(state.players[0], size, SNAKE_COLOR);
      paintPlayer(state.players[1], size, 'red');
    };

    const paintPlayer = (playerState, size, color) => {
      const snake = playerState.snake;

      ctx.fillStyle = color;
      for (let cell of snake) {
        ctx.fillRect(cell.x * size, cell.y * size, size, size);
      }
    };

    const handleGameState = (gameState) => {
      if (!gameActive) {
        return;
      }

      gameState = JSON.parse(gameState);

      requestAnimationFrame(() => paintGame(gameState));
    };

    const handleGameOver = (data) => {
      if (!gameActive) {
        return;
      }

      data = JSON.parse(data);
      if (data.winner === playerNumber) {
        alert('You Win!');
      } else {
        alert('You Lose.');
      }

      gameActive = false;
    };

    const handleInit = (number) => {
      playerNumber = number;
    };

    const handleGameCode = (gameCode) => {
      gameCodeDisplay.innerText = gameCode;
    };

    const reset = () => {
      playerNumber = null;
      gameCodeInput.value = '';
      gameCodeDisplay.innerText = '';
    };

    const handleUnknownGame = () => {
      reset();
      alert('Unknown Game Code');
    };

    const handleTooManyPlayers = () => {
      reset();
      alert('This game is already in progress');
    };

    socket.on('init', handleInit);
    socket.on('gameState', handleGameState);
    socket.on('gameOver', handleGameOver);
    socket.on('gameCode', handleGameCode);
    socket.on('unknownGame', handleUnknownGame);
    socket.on('tooManyPlayers', handleTooManyPlayers);
  };

  return (
    <section className="w-full h-[100vh]">
      <div id="initialScreen" className={`h-full ${!gameScreenState ? '' : 'hidden'}`}>
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl font-bold text-black">Snake Game</h1>
          <button
            type="submit"
            className="px-4 py-2 mt-4 text-white bg-black rounded-md"
            id="newGameButton"
          >
            Create New Game
          </button>
          <div>OR</div>
          <div className="flex flex-col items-center justify-center mt-4">
            <input
              type="text"
              placeholder="Enter Game Code"
              id="gameCodeInput"
              className="px-4 py-2 text-black border-black rounded-md"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 mt-4 text-white bg-black rounded-md"
            id="joinGameButton"
          >
            Join Game
          </button>
        </div>
      </div>

      <div id="gameScreen" className={`h-full ${!gameScreenState ? 'hidden' : ''}`}>
        <div className="w-full h-full flex justify-center items-center">
          <div className="flex flex-col h-full justify-center items-center">
            <h1>
              Your game code is: <span id="gameCodeDisplay" />
            </h1>
            <canvas id="canvas" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Game;
