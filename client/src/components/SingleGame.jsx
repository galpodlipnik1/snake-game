import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { updatePlayerStatsSingle } from '../actions/players';
import { NavBar } from '../components';

const SingleGame = () => {
  const navigate = useNavigate();
  const socket = io('http://localhost:3000');
  const BG_COLOR = '#231f20';
  const SNAKE_COLOR = '#c2c2c2';
  const FOOD_COLOR = '#e66916';

  document.title = 'Snake Game Lobby';
  let gameCodeDisplay;
  let gameScoreDisplay;
  let gameTimerDisplay;
  let gameActive = false;

  useEffect(() => {
    newGame();

    gameCodeDisplay = document.getElementById('gameCodeDisplay');
    gameScoreDisplay = document.getElementById('gameScoreDisplay');
    gameTimerDisplay = document.getElementById('gameTimerDisplay');
  }, []);

  const handleGameStart = () => {
    timerFnc();
  };

  let canvas, ctx;
  let playerNumber;
  let score = 0;
  let timer = '00:00';
  let timerSec = 0;

  const keydown = (e) => {
    socket.emit('singleKeyDown', e.keyCode);
  };

  const init = () => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    canvas.width = canvas.height = 600;

    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    document.addEventListener('keydown', keydown);

    gameActive = true;
  };

  const newGame = () => {
    socket.emit('newSingleGame');
    init();
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
    score = gameState.players[0].score;

    gameScoreDisplay.innerText = score;

    requestAnimationFrame(() => paintGame(gameState));
  };

  const reset = () => {
    playerNumber = null;
  };

  const handleGameOver = (data) => {
    const jsonData = JSON.parse(data);
    let finnalState = jsonData.finnalState;
    finnalState = { ...finnalState, timer: timerSec, winner: jsonData.winner == 2 ? 0 : 1 };

    updatePlayerStatsSingle(finnalState, playerNumber);
    if (!gameActive) {
      return;
    }

    data = JSON.parse(data);
    if (data.winner == 2) {
      reset();
      alert('You lost');
      navigate('/');
    }

    gameActive = false;
  };

  const handleInit = (number) => {
    playerNumber = number;
  };

  const timerFnc = () => {
    let sec = 0;
    let min = 0;
    let timerId;
    if (gameActive) {
      if (timer.includes('99:99') == false) {
        timerId = setInterval(() => {
          timerSec++;
          sec++;
          if (sec === 60) {
            min++;
            sec = 0;
          }
          timer = `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
          gameTimerDisplay.innerText = timer;
        }, 1000);
      } else {
        clearInterval(timerId);
        gameTimerDisplay.innerText = '99:99+';
      }
    } else {
      clearInterval(timerId);
    }
  };

  const handleGameCode = (gcode) => {
    gameCodeDisplay.innerText = gcode;
  };

  socket.on('init', handleInit);
  socket.on('singleGameState', handleGameState);
  socket.on('singleGameOver', handleGameOver);
  socket.on('gameCode', handleGameCode);
  socket.on('singleGameStart', handleGameStart);

  return (
    <>
      <section className="w-full h-[100vh]">
        <NavBar />
        <div id="gameScreen" className={`h-full`}>
          <div className="w-full h-full flex justify-center items-center">
            <div className="flex flex-col h-full justify-center items-center">
              <div className="flex flex-row items-center justify-between w-full">
                <h1 className="text-2xl font-bold text-black">
                  SCORE: <span id="gameScoreDisplay">0</span>
                </h1>
                <h1>
                  TIMER: <span id="gameTimerDisplay">00:00</span>
                </h1>
                <h1>
                  Game Code: <span id="gameCodeDisplay" />
                </h1>
              </div>
              <canvas id="canvas" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleGame;
