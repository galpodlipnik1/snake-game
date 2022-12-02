import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-gray-800 h-24">
      <div className="h-full flex items-center justify-between">
        <div
          className="text-white font-bold text-2xl ml-4"
          onClick={() => {
            navigate('/');
          }}
        >
          🐍 Snake 🐍
        </div>
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
      </div>
    </div>
  );
};

export default NavBar;
