import React from 'react';
import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';

import { GamePage, HomePage, SettingsPage, Leaderboard } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
