import React from 'react';

const Game = () => {
  const BG_COLOR = '#231f20';
  const SNAKE_COLOR = '#c2c2c2';
  const FOOD_COLOR = '#e66916';
  const gameScreen = document.getElementById('game-screen');
  let canvas, ctx;

  const init = () => {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');

    canvas.width = canvas.height = 600;

    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0,0, canvas.width, canvas.height);

    document.addEventListener('keydown', keydown);
    
  };

  return (
    <section className="vh-100">
      <div id="gameScreen" className="h-100">
        <div className="container h-100">
          <div className="d-flex flex-column align-items-center justify-content-center h-100">
            <canvas id="canvas"></canvas>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Game;
