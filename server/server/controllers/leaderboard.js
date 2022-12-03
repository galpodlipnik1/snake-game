import mongoose from "mongoose";
import chalk from "chalk";

import PlayerModal from '../models/players.js';

export const getLeaderboard = async(req, res) => {
    try {
        const allPlayers = await PlayerModal.find();

        const mostWins = allPlayers.sort((a, b) => b.stats.wins - a.stats.wins);
        const mostLosses = allPlayers.sort((a, b) => b.stats.losses - a.stats.losses);
        const bestWinRate = allPlayers.sort((a, b) => b.stats.winRate - a.stats.winRate);
        const highestAvgScore = allPlayers.sort((a, b) => b.stats.avgScore - a.stats.avgScore);
        const highestScore = allPlayers.sort((a, b) => b.stats.score - a.stats.score);
        const highestAvgTime = allPlayers.sort((a, b) => b.stats.avgTime - a.stats.avgTime);

        console.log(chalk.greenBright("Leaderboard data retrieved successfully!"));
        res.status(200).json({ mostWins, mostLosses, bestWinRate, highestAvgScore, highestScore, highestAvgTime });
    } catch (error) {
        
    }
}