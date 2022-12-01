import React from 'react';
import { Game } from '../components';
import { useParams } from 'react-router-dom';

const GamePage = () => {
  const { type, gameCode } = useParams();

  return <Game type={type} gameCode={gameCode} />;
};

export default GamePage;
