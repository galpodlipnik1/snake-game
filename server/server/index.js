import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import https from 'https';
import fs from 'fs';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';

import playerRoutes from './routes/players.js';
import leaderboardRoutes from './routes/leaderboard.js';

const options =  {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}


const app = express();

const server = https.createServer(options, app);

dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/players', playerRoutes);
app.use('/leaderboard', leaderboardRoutes);

app.get('/', (req, res) => {
    let date = new Date();
    let message = `Server is running on port: ${process.env.PORT}`;
    let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let latency = date.getMilliseconds();
    let version = '0.0';

    res.status(200).json({ status: 200, message: message, time: time, latency: latency , version: version });
});

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => server.listen(PORT, () => console.log(chalk.greenBright(`Server running on port: ${PORT}`))))
    .catch((error) => console.log(error.message));