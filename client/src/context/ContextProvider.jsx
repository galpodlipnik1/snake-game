import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  return (
    <StateContext.Provider value={{ user, setUser, isLogged, setIsLogged }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
