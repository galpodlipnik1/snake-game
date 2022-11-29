import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [example, setExample] = useState('example');

  return <StateContext.Provider value={{ example, setExample }}>{children}</StateContext.Provider>;
};

export const useStateContext = () => useContext(StateContext);
