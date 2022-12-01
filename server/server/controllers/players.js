import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import chalk from 'chalk';

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

        const result = await PlayerModal.create({ username, password: hashedPassword, email });

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
    const { id } = req.params;

    const { stats } = req.body;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No player with id: ${id}`);

        const player = await PlayerModal.findById(id);

        const updatedPlayer = await PlayerModal.findByIdAndUpdate(id, { stats }, { new: true });

        console.log(chalk.green(`[${dateAndTime}] Player stats updated(${player.username})`));
        res.json(updatedPlayer);
    } catch (error) {
        console.log(chalk.red(`[${dateAndTime}] ${error.message}`));

        res.status(404).json({ message: error.message });
    }
};

export const deletePlayer = async (req, res) => {
    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No player with id: ${id}`);

        await PlayerModal.findByIdAndRemove(id);

        console.log(chalk.green(`[${dateAndTime}] Player deleted(${id})`));
        res.json({ message: "Player deleted successfully." });
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
