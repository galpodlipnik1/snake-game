import React from 'react';
import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';

import { HomePage, SettingsPage, Leaderboard, LobbyPage, GamePage } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<HomePage />} />
        <Route path="/lobby" element={<LobbyPage />} />
        <Route path="/game/:type/:gameCode" element={<GamePage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
