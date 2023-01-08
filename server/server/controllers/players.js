import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import chalk from 'chalk';
import mongoose from 'mongoose';

dotenv.config();

import PlayerModal from '../models/players.js';

const secret = process.env.JWT_SECRET;
const dateAndTime = new Date().toLocaleString();

export const addPlayer = async (req, res) => {
    const { username, password, email } = req.body;
    
    try {
        const oldUser = await PlayerModal.findOne({ username });

        if(oldUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const statsObj = {
            numOfGames: 0,
            numOfWins: 0,
            numOfLosses: 0,
            winRate: 0,
            avgScore: 0,
            avgTime: 0,
            combinedScore: 0,
            combinedTime: 0,
        }

        const singleStatsObj = {
            numOfGames: 0,
            avgScore: 0,
            avgTime: 0,
            combinedScore: 0,
            combinedTime: 0,
        }

        const result = await PlayerModal.create({ username, password: hashedPassword, email, stats: statsObj, singleStats: singleStatsObj });

        const token = jwt.sign({ username: result.username, id: result._id }, secret, { expiresIn: "24h" });

        console.log(chalk.green(`[${dateAndTime}] User ${username} created`));

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });

        console.log(chalk.red(`[${dateAndTime}] ${error.message}`));
    }
};

export const getPlayers = async (req, res) => {
    try {
        const players = await PlayerModal.find();

        console.log(chalk.green(`[${dateAndTime}] Players fetched(${players.length})`));
        res.status(200).json(players);
    } catch (error) {
        console.log(chalk.red(`[${dateAndTime}] ${error.message}`));

        res.status(404).json({ message: error.message });
    }

};

export const getPlayer = async (req, res) => {
    const { id } = req.params;

    try {
        const player = await PlayerModal.findById(id);

        console.log(chalk.green(`[${dateAndTime}] Player fetched(${player.username})`));
        res.status(200).json(player);
    } catch (error) {
        console.log(chalk.red(`[${dateAndTime}] ${error.message}`));

        res.status(404).json({ message: error.message });
    }
};

export const updatePlayerStats= async (req, res) => {
    const { id,type } = req.params;

    let { playerNumber } = req.body;
    let players = req.body.updatedStats.players;
    let timer = req.body.updatedStats.timer;
    let winner = req.body.updatedStats.winner;
    let score = players[playerNumber - 1].score;
    score = parseInt(score);
    timer = parseInt(timer);
    winner = parseInt(winner);
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No player with id: ${id}`);

        const player = await PlayerModal.findById(id);
        let statObj = {};
        let updatedPlayer; 
        if(type === 'singleplayer') {
            statObj = {
                numOfGames: Number(player.singleStats.numOfGames + 1),
                combinedScore: Number(player.singleStats.combinedScore + score),
                combinedTime: Number(player.singleStats.combinedTime + timer),
                avgScore: Number((player.singleStats.combinedScore + score) / (player.singleStats.numOfGames + 1)),
                avgTime: Number((player.singleStats.combinedTime + timer) / (player.singleStats.numOfGames + 1)),
            }
            
            updatedPlayer = await PlayerModal.findByIdAndUpdate(id, { singleStats: statObj }, { new: true });
        } else {
            statObj = {
                numOfGames: Number(player.stats.numOfGames + 1),
                numOfWins: Number(player.stats.numOfWins + winner),
                numOfLosses: Number(player.stats.numOfLosses + winner == 0 ? 1 : 0),
                winRate: Number(((player.stats.numOfWins + winner) / (player.stats.numOfGames + 1)) * 100),
                combinedScore: Number(player.stats.combinedScore + score),
                combinedTime: Number(player.stats.combinedTime + timer),
                avgScore: Number((player.stats.combinedScore + score) / (player.stats.numOfGames + 1)),
                avgTime: Number((player.stats.combinedTime + timer) / (player.stats.numOfGames + 1)),
            }
            updatedPlayer = await PlayerModal.findByIdAndUpdate(id, { stats: statObj }, { new: true });
        }

        console.log(chalk.green(`[${dateAndTime}] Player stats updated(${player.username})`));
        res.json(updatedPlayer);
    } catch (error) {
        console.log(chalk.red(`[${dateAndTime}] ${error.message}`));

        res.status(404).json({ message: error.message });
    }
};

export const loginPlayer = async (req, res) => {
    const { username, password } = req.body;

    try {
        const oldUser = await PlayerModal.findOne({ username });

        if(!oldUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ username: oldUser.username, id: oldUser._id }, secret, { expiresIn: "24h" });

        console.log(chalk.green(`[${dateAndTime}] User ${username} logged in`));

        res.status(200).json({ result: oldUser, token });
    } catch (error) {
        console.log(chalk.red(`[${dateAndTime}] ${error.message}`));

        res.status(404).json({ message: error.message });
    }
};

export const changeUsername = async (req, res) => {
    const { id } = req.params;
    const { username } = req.body;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No player with id: ${id}`);

        const updatedPlayer = await PlayerModal.findByIdAndUpdate(id, { username }, { new: true });

        console.log(chalk.green(`[${dateAndTime}] Player username changed(${updatedPlayer.username})`));
        res.json(updatedPlayer);
    } catch (error) {
        console.log(chalk.red(`[${dateAndTime}] ${error.message}`));

        res.status(404).json({ message: error.message });
    }
};

export const changePassword = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No player with id: ${id}`);

        const hashedPassword = await bcrypt.hash(password, 12);

        const updatedPlayer = await PlayerModal.findByIdAndUpdate (id, { password: hashedPassword }, { new: true });

        console.log(chalk.green(`[${dateAndTime}] Player password changed(${updatedPlayer.username})`));
        res.json(updatedPlayer);
    } catch (error) {
        console.log(chalk.red(`[${dateAndTime}] ${error.message}`));

        res.status(404).json({ message: error.message });
    }
};

export const changeEmail = async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No player with id: ${id}`);

        const updatedPlayer = await PlayerModal.findByIdAndUpdate(id, { email }, { new: true });

        console.log(chalk.green(`[${dateAndTime}] Player email changed(${updatedPlayer.username})`));
        res.json(updatedPlayer);
    } catch (error) {
        console.log(chalk.red(`[${dateAndTime}] ${error.message}`));

        res.status(404).json({ message: error.message });
    }
};

