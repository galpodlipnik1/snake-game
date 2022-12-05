import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';

const NavBar = () => {
  const navigate = useNavigate();
  const [player, setPlayer] = useState('');
  const { setIsLogged, setUser, user } = useStateContext();

  useEffect(() => {
    if (localStorage.getItem('profile') || user) {
      if (user) {
        setPlayer(user);
      } else {
        const player = JSON.parse(localStorage.getItem('profile')).result;
        setPlayer(player);
      }
    }
  }, []);

  return (
    <div className="w-full bg-gray-800 h-24">
      <div className="h-full flex items-center justify-between">
        <div
          className="text-white font-bold text-4xl ml-10 cursor-pointer select-none"
          onClick={() => {
            navigate('/');
          }}
        >
          🐍
        </div>
        {player == '' ? (
          <div className="mx-16">
            <button
              className="bg-gray-600 text-white font-bold py-2 px-4 rounded ml-4 hover:bg-gray-700"
              onClick={() => navigate('/auth/login')}
            >
              Login
            </button>
            <button
              className="bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4 hover:bg-gray-600"
              onClick={() => navigate('/auth/register')}
            >
              Register
            </button>
          </div>
        ) : (
          <div className="flex justify-center items-center mx-16 ">
            <div className="w-[40px] h-[40px] flex justify-center items-center bg-purple-500 rounded-full mr-3">
              <span className="text-white text-2xl">
                {player.username
                  ? player.username.charAt(0).toUpperCase()
                  : window.location.reload()}
              </span>
            </div>
            <div className="mb-1">
              <span className="text-white text-xl">{player.username}</span>
            </div>
            <div>
              <button
                className="bg-red-400 text-white font-bold py-1 px-3 rounded ml-4 hover:bg-red-500"
                onClick={() => {
                  setPlayer('');
                  localStorage.clear();
                  setUser(null);
                  setIsLogged(false);
                  navigate('/');
                }}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
