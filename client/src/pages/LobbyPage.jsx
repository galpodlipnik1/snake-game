import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LobbyPage = () => {
  const [gameCode, setGameCode] = useState('');
  const navigate = useNavigate();

  const handleNewGame = () => {
    navigate('/game/create/null');
  };

  const handleJoinGame = () => {
    if (gameCode.length > 0) {
      navigate(`/game/join/${gameCode}`);
    } else {
      alert('Please enter a game code');
    }
  };
  return (
    <>
      <div
        id="initialScreen"
        className={`w-full h-[100vh] flex flex-col justify-center items-center`}
      >
        <h1 className="text-4xl font-bold text-black">Snake Game</h1>
        <button
          type="submit"
          className="px-4 py-2 my-3 text-white bg-black rounded-md"
          id="newGameButton"
          onClick={handleNewGame}
        >
          Create New Game
        </button>
        <div>OR</div>
        <div className="flex flex-col items-center justify-center mt-4">
          <input
            type="text"
            placeholder="Enter Game Code"
            id="gameCodeInput"
            className="px-4 py-2 text-black border-2 border-black rounded-md"
            onChange={(e) => setGameCode(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 mt-4 text-white bg-black rounded-md"
          id="joinGameButton"
          onClick={handleJoinGame}
        >
          Join Game
        </button>
      </div>
    </>
  );
};

export default LobbyPage;
