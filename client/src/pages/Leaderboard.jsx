import React, { useState, useEffect } from 'react';
import { NavBar } from '../components';
import { getPlayers } from '../actions/players';

function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [multiplayerLeaderboard, setMultiplayerLeaderboard] = useState([]);
  const [singleplayerLeaderboard, setSingleplayerLeaderboard] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const res = await getPlayers();
      const playersMulti = res.sort((a, b) => b.stats.combinedScore - a.stats.combinedScore);
      const playersSingle = res.sort(
        (a, b) => b.singleStats.combinedScore - a.singleStats.combinedScore
      );
      setMultiplayerLeaderboard(playersMulti);
      setSingleplayerLeaderboard(playersSingle);
      setPlayers(res);
    };
    fetchPlayers();
  }, []);

  useEffect(() => {
    console.log(players);
  }, [players]);

  return (
    <div className="w-full h-[100vh]">
      <NavBar />
      <div className="mt-3">
        <h1 className="text-4xl font-bold text-center">Leaderboard</h1>
      </div>
    </div>
  );
}

export default Leaderboard;
