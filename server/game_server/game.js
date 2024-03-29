import { GRID_SIZE } from './constants.js';

export const initGame = () => {
  const state = createGameState()
  randomFood(state);
  return state;
}

export const initSingleGame = () => {
  const state = createSingleGameState()
  SinglerandomFood(state);
  return state;
}

function createGameState() {
  return {
    players: [{
      pos: {
        x: 3,
        y: 10,
      },
      vel: {
        x: 1,
        y: 0,
      },
      snake: [
        {x: 1, y: 10},
        {x: 2, y: 10},
        {x: 3, y: 10},
      ],
      score: 0
    }, {
      pos: {
        x: 18,
        y: 10,
      },
      vel: {
        x: -1,
        y: 0,
      },
      snake: [
        {x: 20, y: 10},
        {x: 19, y: 10},
        {x: 18, y: 10},
      ],
      score: 0
    }],
    food: {},
    gridsize: GRID_SIZE,
  };
}

function createSingleGameState() {
  return {
    players: [{
      pos: {
        x: 3,
        y: 10,
      },
      vel: {
        x: 1,
        y: 0,
      },
      snake: [
        {x: 1, y: 10},
        {x: 2, y: 10},
        {x: 3, y: 10},
      ],
      score: 0
    }],
    food: {},
    gridsize: GRID_SIZE,
  };
}

export const singleGameLoop = (state) => {
  if (!state) {
    console.log('no state');
    return;
  }

  const playerOne = state.players[0];

  playerOne.pos.x += playerOne.vel.x;
  playerOne.pos.y += playerOne.vel.y;

  if (playerOne.pos.x < 0 || playerOne.pos.x > GRID_SIZE || playerOne.pos.y < 0 || playerOne.pos.y > GRID_SIZE) {
    console.log('Player 1 hit the wall');
    return 2;
  }

  if (state.food.x === playerOne.pos.x && state.food.y === playerOne.pos.y) {
    playerOne.snake.push({ ...playerOne.pos });
    playerOne.pos.x += playerOne.vel.x;
    playerOne.pos.y += playerOne.vel.y;

    playerOne.score += 1;

    SinglerandomFood(state);
  }

  if (playerOne.vel.x || playerOne.vel.y) {
    for (let cell of playerOne.snake) {
      if (cell.x === playerOne.pos.x && cell.y === playerOne.pos.y) {
        console.log('player 1 hit itself');
        return 2;
      }
    }

    playerOne.snake.push({ ...playerOne.pos });
    playerOne.snake.shift();
  }

  return false;
  
};

export const gameLoop = (state) => {
  if (!state) {
    console.log('no state');
    return;
  }

  const playerOne = state.players[0];
  const playerTwo = state.players[1];

  playerOne.pos.x += playerOne.vel.x;
  playerOne.pos.y += playerOne.vel.y;

  playerTwo.pos.x += playerTwo.vel.x;
  playerTwo.pos.y += playerTwo.vel.y;

  for (let cell of playerOne.snake) {
    if (cell.x === playerTwo.pos.x && cell.y === playerTwo.pos.y) {
      console.log('player 2 hit player 1');
      return 1;
    }
  }

  for (let cell of playerTwo.snake) {
    if (cell.x === playerOne.pos.x && cell.y === playerOne.pos.y) {
      console.log('player 1 hit player 2');
      return 2;
    }
  }

  if (playerOne.pos.x < 0 || playerOne.pos.x > GRID_SIZE || playerOne.pos.y < 0 || playerOne.pos.y > GRID_SIZE) {
    console.log('Player 1 hit the wall');
    return 2;
  }

  if (playerTwo.pos.x < 0 || playerTwo.pos.x > GRID_SIZE || playerTwo.pos.y < 0 || playerTwo.pos.y > GRID_SIZE) {
    console.log('player 2 hit the wall');
    return 1;
  }

  if(playerOne.pos.x == playerTwo.pos.x && playerOne.pos.y == playerTwo.pos.y) {
    console.log('players hit each other');
    return 2;
  }

  if(playerTwo.pos.x == playerOne.pos.x && playerTwo.pos.y == playerOne.pos.y) {
    console.log('players hit each other');
    return 1;
  }

  if (state.food.x === playerOne.pos.x && state.food.y === playerOne.pos.y) {
    playerOne.snake.push({ ...playerOne.pos });
    playerOne.pos.x += playerOne.vel.x;
    playerOne.pos.y += playerOne.vel.y;

    playerOne.score += 1;

    randomFood(state);
  }

  if (state.food.x === playerTwo.pos.x && state.food.y === playerTwo.pos.y) {
    playerTwo.snake.push({ ...playerTwo.pos });
    playerTwo.pos.x += playerTwo.vel.x;
    playerTwo.pos.y += playerTwo.vel.y;

    playerTwo.score += 1;

    randomFood(state);
  }

  if (playerOne.vel.x || playerOne.vel.y) {
    for (let cell of playerOne.snake) {
      if (cell.x === playerOne.pos.x && cell.y === playerOne.pos.y) {
        console.log('player 1 hit itself');
        return 2;
      }
    }

    playerOne.snake.push({ ...playerOne.pos });
    playerOne.snake.shift();
  }

  if (playerTwo.vel.x || playerTwo.vel.y) {
    for (let cell of playerTwo.snake) {
      if (cell.x === playerTwo.pos.x && cell.y === playerTwo.pos.y) {
        console.log('player 2 hit itself');
        return 1;
      }
    }

    playerTwo.snake.push({ ...playerTwo.pos });
    playerTwo.snake.shift();
  }

  return false;
}

const randomFood = (state) => {
  let food = {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  }

  for (let cell of state.players[0].snake) {
    if (cell.x === food.x && cell.y === food.y) {
      return randomFood(state);
    }
  }

  for (let cell of state.players[1].snake) {
    if (cell.x === food.x && cell.y === food.y) {
      return randomFood(state);
    }
  }

  state.food = food;
}

const SinglerandomFood = (state) => {
  let food = {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  }

  for (let cell of state.players[0].snake) {
    if (cell.x === food.x && cell.y === food.y) {
      return SinglerandomFood(state);
    }
  }

  state.food = food;
}

export const getUpdatedVelocity = (keyCode, keySettings, state, playerIndex) => {
  console.log(playerIndex);
  const playerOne = state.players[playerIndex];
  console.log(keyCode, keySettings);
  switch (keyCode) {
    case parseInt(keySettings.left): { // left
      if (playerOne.vel.x === 1) {
        return;
      }
      return { x: -1, y: 0 };
    }
    case parseInt(keySettings.up): { // up
      if (playerOne.vel.y === 1) {
        return;
      }
      return { x: 0, y: -1 };
    }
    case parseInt(keySettings.right): { // right
      if (playerOne.vel.x === -1) {
        return;
      }
      return { x: 1, y: 0 };
    }
    case parseInt(keySettings.down): { // down
      if (playerOne.vel.y === -1) {
        return;
      }
      return { x: 0, y: 1 };
    }
  }
}