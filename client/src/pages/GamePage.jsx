import React from 'react';
import { Game, SingleGame } from '../components';
import { useParams } from 'react-router-dom';

const GamePage = () => {
  const { type, gameCode } = useParams();

  if (type === 'single') {
    return <SingleGame />;
  } else {
    return <Game type={type} gameCode={gameCode} />;
  }
};

export default GamePage;
