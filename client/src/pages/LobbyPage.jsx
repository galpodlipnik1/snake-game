import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { NavBar } from '../components';

const LobbyPage = () => {
  const [gameCode, setGameCode] = useState('');
  const [lobbys, setLobbys] = useState([]);
  const navigate = useNavigate();
  const socket = io('http://localhost:3000');

  useEffect(() => {
    socket.emit('getLobbys');
    setInterval(() => {
      try {
        socket.emit('getLobbys');
      } catch (error) {
        /* empty */
      }
    }, 10000);
  }, []);

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

  const handleLobbys = (servLobbys) => {
    const lobbys = JSON.parse(servLobbys);
    setLobbys(lobbys);
  };

  socket.on('lobbys', handleLobbys);
  return (
    <div className="w-full h-[100vh]">
      <NavBar />
      <div id="initialScreen" className={`w-full flex flex-col items-center mt-10`}>
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
      <div className="h-full grid grid-cols-4 gap-4 mt-10 ml-5">
        {lobbys.map((lobby) => (
          <div key={lobby.gameCode} className="bg-gray-200 rounded-md p-4 h-[20%] flex flex-col">
            <h1 className="text-2xl text-black">
              Game Code: <span className="font-bold underline">{lobby.gameCode}</span>
            </h1>
            <h1 className="text-2xl text-black">
              Players: <span className="font-bold">{lobby.players}</span>
            </h1>
            <button
              type="submit"
              className="px-4 py-2 mt-4 text-white bg-black rounded-md"
              id="joinGameButton"
              onClick={() => navigate(`/game/join/${lobby.gameCode}`)}
            >
              Join Game
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LobbyPage;
