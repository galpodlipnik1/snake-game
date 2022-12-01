import express from 'express';

const router = express.Router();

import { addPlayer, getPlayers, getPlayer, updatePlayerStats, deletePlayer, loginPlayer } from '../controllers/players.js';

router.post('/addplayer', addPlayer);
router.get('/getplayers', getPlayers);
router.get('/getplayer/:id', getPlayer);
router.patch('/updateplayer/:id', updatePlayerStats);
router.delete('/deleteplayer/:id', deletePlayer);
router.post('/loginplayer', loginPlayer);