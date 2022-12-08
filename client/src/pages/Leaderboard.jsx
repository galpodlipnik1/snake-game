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
      playersMulti.slice(0, 19);
      const playersSingle = res.sort(
        (a, b) => b.singleStats.combinedScore - a.singleStats.combinedScore
      );
      playersSingle.slice(0, 19);
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
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center w-1/2">
            <h1 className="text-2xl font-bold text-center">Multiplayer</h1>
            <div className="flex flex-col items-center justify-center w-full">
              {multiplayerLeaderboard.map((player, index) => (
                <div
                  key={player._id}
                  className="flex flex-row items-center justify-between w-full p-2 my-2 border-2 border-black rounded-md"
                >
                  <div className="flex flex-row items-center justify-center">
                    <h1 className="text-xl font-bold">{index + 1}.</h1>
                    <h1 className="text-xl font-bold ml-2">{player.username}</h1>
                  </div>
                  <div className="flex flex-row items-center justify-between ">
                    <div className="flex flex-col items-center justify-center mr-2 pr-2 border-r-2 border-r-black">
                      <span>ALL SCORES:</span>
                      <h1 className="text-xl font-bold">{player.stats.combinedScore}</h1>
                    </div>
                    <div className="flex flex-col items-center justify-center mr-2 pr-2 border-r-2 border-r-black">
                      <span>WINS:</span>
                      <h1 className="text-xl font-bold">{player.stats.numOfWins}</h1>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <span>WIN RATE:</span>
                      <h1 className="text-xl font-bold"> {player.stats.winRate}%</h1>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-1/2">
            <h1 className="text-2xl font-bold text-center">Singleplayer</h1>
            <div className="flex flex-col items-center justify-center w-full">
              {singleplayerLeaderboard.map((player, index) => (
                <div
                  key={player._id}
                  className="flex flex-row items-center justify-between w-full p-2 my-2 border-2 border-black rounded-md"
                >
                  <div className="flex flex-row items-center justify-center">
                    <h1 className="text-xl font-bold">{index + 1}.</h1>
                    <h1 className="text-xl font-bold ml-2">{player.username}</h1>
                  </div>
                  <div className="flex flex-row items-center justify-between ">
                    <div className="flex flex-col items-center justify-center mr-2 pr-2 border-r-2 border-r-black">
                      <span>ALL SCORES:</span>
                      <h1 className="text-xl font-bold">{player.singleStats.combinedScore}</h1>
                    </div>
                    <div className="flex flex-col items-center justify-center mr-2 pr-2 border-r-2 border-r-black">
                      <span>AVG. SCORE:</span>
                      <h1 className="text-xl font-bold">{player.singleStats.avgScore}</h1>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <span>NUM OF GAMES:</span>
                      <h1 className="text-xl font-bold"> {player.singleStats.numOfGames}</h1>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
