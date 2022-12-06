import React from 'react';
import { HashRouter, Routes as Switch, Route } from 'react-router-dom';

import { HomePage, SettingsPage, Leaderboard, LobbyPage, GamePage, Auth } from './pages';

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" element={<HomePage />} />
        <Route path="/lobby" element={<LobbyPage />} />
        <Route path="/game/:type/:gameCode" element={<GamePage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/auth/:type" element={<Auth />} />
      </Switch>
    </HashRouter>
  );
};

export default App;
