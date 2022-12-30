import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { NavBar } from '../components';
import { getCharFromKeyCode, getKeyCodeFromChar } from '../functions/helperFunctions';
import { changeEmail, changeUsername, changePassword } from '../actions/players';

const SettingsPage = () => {
  useEffect(() => {
    document.title = 'Snake Game Settings';
    const keyCodes = JSON.parse(localStorage.getItem('keys'));
    const directions = ['up', 'down', 'left', 'right'];
    directions.forEach((direction) => {
      const input = document.querySelector(`input[name=${direction}]`);
      let key;
      if (keyCodes[direction] >= 41 && keyCodes[direction] <= 122) {
        key = String.fromCharCode(keyCodes[direction]);
      } else {
        key = getCharFromKeyCode(keyCodes[direction]);
      }
      input.value = key;
    });

    const volume = localStorage.getItem('volume');
    const volumeInput = document.querySelector('input[name=volume]');
    volumeInput.value = volume;
  }, []);
  const handleClick = (direction) => {
    const input = document.querySelector(`input[name=${direction}]`);
    input.value = 'Press a key';
    input.addEventListener('keydown', (e) => {
      e.preventDefault();
      input.value = e.key;
    });
  };

  const handleChangeKeys = (e) => {
    e.preventDefault();
    const directions = ['up', 'down', 'left', 'right'];
    const keys = {};
    directions.forEach((direction) => {
      const input = document.querySelector(`input[name=${direction}]`);
      const key = input.value;
      const keyCode = key.length === 1 ? key.charCodeAt(0) : getKeyCodeFromChar(key);
      if (keyCode >= 41 && keyCode <= 122) {
        keys[direction] = keyCode - 32;
      } else {
        keys[direction] = keyCode;
      }
    });
    const values = Object.values(keys);
    const keysInRange = values.every((value) => value >= 37 && value <= 122);
    if (!keysInRange) {
      toast.error('Keys must be in range a-z');
      return;
    }
    localStorage.setItem('keys', JSON.stringify(keys));
    toast.success('Keys changed successfully');
  };

  const handleChangeVolume = (e) => {
    e.preventDefault();
    const volume = document.querySelector('input[name=volume]').value;
    localStorage.setItem('volume', volume);
    toast.success('Volume changed successfully');
  };

  const changeUsernameFnc = (e) => {
    e.preventDefault();
    const username = document.querySelector('input[name=username]').value;
    if (username.length <= 3) {
      toast.error('Username must be at least 3 characters long');
      return;
    }
    changeUsername(username);
    toast.success('Username changed successfully');
    document.querySelector('input[name=username]').value = '';
  };

  const changePasswordFnc = (e) => {
    e.preventDefault();
    const password = document.querySelector('input[name=password]').value;
    if (password.length <= 3) {
      toast.error('Password must be at least 3 characters long');
      return;
    }

    changePassword(password);
    toast.success('Password changed successfully');
    document.querySelector('input[name=password]').value = '';
  };

  const changeEmailFnc = (e) => {
    e.preventDefault();
    const email = document.querySelector('input[name=email]').value;
    if (email.length <= 3) {
      toast.error('Email must be at least 3 characters long');
      return;
    }
    changeEmail(email);
    toast.success('Email changed successfully');
    document.querySelector('input[name=email]').value = '';
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Toaster />
      <NavBar />
      <div className=" flex justify-center items-center">
        <h1 className="text-2xl underline uppercase">Settings Page</h1>
      </div>
      <div className="flex flex-row justify-around items-center mt-10 w-full">
        <form className="flex flex-col justify-center items-center border-2 border-black rounded-lg bg-green-400 p-3 ">
          <h2 className="underline uppercase">Change Username</h2>
          <input type="text" name="username" className="border-2 border-black rounded-lg mt-2" />
          <button
            className="bg-white border-2 border-black rounded-lg p-1 mt-2 active:translate-y-2 duration-200"
            onClick={changeUsernameFnc}
          >
            Change
          </button>
        </form>

        <form className="flex flex-col justify-center items-center border-2 border-black rounded-lg bg-green-400 p-3 active:translate-y-2 duration-200">
          <h2 className="underline uppercase">Change Password</h2>
          <input
            type="password"
            name="password"
            className="border-2 border-black rounded-lg mt-2"
          />
          <button
            className="bg-white border-2 border-black rounded-lg p-1 mt-2 active:translate-y-2 duration-200"
            onClick={changePasswordFnc}
          >
            Change
          </button>
        </form>
        <form className="flex flex-col justify-center items-center border-2 border-black rounded-lg bg-green-400 p-3 ">
          <h2 className="underline uppercase">Change Email</h2>
          <input type="email" name="email" className="border-2 border-black rounded-lg mt-2" />
          <button
            className="bg-white border-2 border-black rounded-lg p-1 mt-2 active:translate-y-2 duration-200"
            onClick={changeEmailFnc}
          >
            Change
          </button>
        </form>

        <form className="flex flex-col justify-center items-center border-2 border-black rounded-lg bg-green-400 p-3 ">
          <h2 className="underline uppercase">Change Profile Picture</h2>
          <input type="file" className="border-2 border-black rounded-lg mt-2 p-1" />
          <button className="bg-white border-2 border-black rounded-lg p-1 mt-2 active:translate-y-2 duration-200">
            Change
          </button>
        </form>
      </div>
      <div className="flex flex-row justify-around items-center mt-10 w-full">
        <div className="flex flex-row justify-around items-center mt-10 w-6/12">
          <form
            className="flex flex-col justify-center items-center border-2 border-black rounded-lg bg-green-400 p-3 w-full"
            onSubmit={handleChangeKeys}
          >
            <h2 className="underline uppercase">Change Keybinds</h2>
            <div className=" w-full flex flex-row justify-around items-center">
              <div className="flex flex-col justify-center items-center">
                <label htmlFor="up">Up</label>
                <input
                  type="button"
                  name="up"
                  className="bg-white border-2 border-black rounded-lg p-2 mt-2"
                  value="ArrowUp"
                  onClick={() => handleClick('up')}
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <label htmlFor="down">Down</label>
                <input
                  type="button"
                  name="down"
                  className="bg-white border-2 border-black rounded-lg p-2 mt-2"
                  value="ArrowDown"
                  onClick={() => handleClick('down')}
                />
              </div>

              <div className="flex flex-col justify-center items-center">
                <label htmlFor="left">Left</label>
                <input
                  type="button"
                  name="left"
                  className="bg-white border-2 border-black rounded-lg p-2 mt-2"
                  value="ArrowLeft"
                  onClick={() => handleClick('left')}
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <label htmlFor="right">Right</label>
                <input
                  type="button"
                  name="right"
                  className="bg-white border-2 border-black rounded-lg p-2 mt-2"
                  value="ArrowRight"
                  onClick={() => handleClick('right')}
                />
              </div>
            </div>
            <button
              className="bg-white border-2 border-black rounded-lg p-2 mt-2 active:translate-y-2 duration-200"
              onSubmit={handleChangeKeys}
            >
              Change
            </button>
          </form>
        </div>
        <div className="flex flex-col justify-center items-center border-2 border-black rounded-lg bg-green-400 p-3 w-3/12">
          <h2 className="underline uppercase">Music Volume</h2>
          <input
            type="range"
            name="volume"
            className="border-2 border-black rounded-lg mt-2"
            onChange={handleChangeVolume}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
