import React from 'react';
import { NavBar } from '../components';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';

const HomePage = () => {
  const navigate = useNavigate();
  const { isLogged } = useStateContext();

  const handleInstaPlay = () => {
    if (isLogged) {
      navigate('/game/create/null');
    } else {
      navigate('/auth/login');
    }
  };

  const handleLobby = () => {
    if (isLogged) {
      navigate('/lobby');
    } else {
      navigate('/auth/login');
    }
  };

  const handleLeaderboard = () => {
    if (isLogged) {
      navigate('/leaderboard');
    } else {
      navigate('/auth/login');
    }
  };

  const handleSettings = () => {
    if (isLogged) {
      navigate('/settings');
    } else {
      navigate('/auth/login');
    }
  };

  return (
    <div className="w-full h-[81.3vh]">
      <NavBar />
      <div className="h-full bg-green-900 flex flex-col">
        <div className="mt-3 flex flex-col items-center">
          <h1 className="text-4xl text-white font-serif font-bold">🐍Game Snake🐍</h1>
          <div className="w-8/12 flex justify-center mt-10 text-center">
            <p className="text-white font-serif font-bold text-l">
              Snake is a video game genre where the player maneuvers a line that grows bigger after
              eating something, typically apples, making the snake a primary obstacle to itself. The
              concept originated in the 1976 two-player arcade game Blockade from Gremlin
              Industries, and the ease of implementation has led to hundreds of versions (some of
              which have the word snake or worm in the title) for many platforms. 1982&apos;s Tron
              arcade game, based on the film, includes snake gameplay for the single-player Light
              Cycles segment. After a variant was preloaded on Nokia mobile phones in 1998, there
              was a resurgence of interest in snake games as it found a larger audience.
            </p>
          </div>
          <div className="flex flex-col w-2/12 bg-white rounded-2xl mt-10">
            <button
              type="button"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-10 mx-5 hover:translate-y-3 transition duration-500 ease-in-out"
              onClick={() => {
                handleInstaPlay();
              }}
            >
              Insta Play
            </button>
            <button
              type="button"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-10 mx-5 hover:translate-y-3 transition duration-500 ease-in-out"
              onClick={() => {
                handleLobby();
              }}
            >
              Lobby
            </button>
            <button
              type="button"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-10 mx-5 hover:translate-y-3 transition duration-500 ease-in-out"
              onClick={() => {
                handleLeaderboard();
              }}
            >
              Leaderboard
            </button>
            <button
              type="button"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-10 mx-5 hover:translate-y-3 transition duration-500 ease-in-out mb-5"
              onClick={() => {
                handleSettings();
              }}
            >
              Profile/Settings
            </button>
          </div>
        </div>
      </div>
      <footer className="w-full h-20 bg-green-900 flex justify-center items-center">
        <p className="text-white font-serif font-bold text-sm">
          {`© ${new Date().getFullYear()} Gal Podlipnik. All rights reserved.`}
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
