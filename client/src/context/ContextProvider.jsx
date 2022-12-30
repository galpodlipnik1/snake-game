import React, { createContext, useContext, useState, useEffect } from 'react';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('profile')) {
      setUser(JSON.parse(localStorage.getItem('profile')));
      setIsLogged(true);
    }
    if (!localStorage.getItem('keys')) {
      const keys = {
        up: 38,
        down: 40,
        left: 37,
        right: 39
      };
      localStorage.setItem('keys', JSON.stringify(keys));
    }
    if (!localStorage.getItem('volume')) {
      localStorage.setItem('volume', 100);
    }
  }, []);

  return (
    <StateContext.Provider value={{ user, setUser, isLogged, setIsLogged }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
