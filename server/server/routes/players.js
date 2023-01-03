import express from 'express';

const router = express.Router();

import { addPlayer, getPlayers, getPlayer, updatePlayerStats, loginPlayer, changeUsername, changePassword, changeEmail } from '../controllers/players.js';

router.post('/addplayer', addPlayer);
router.get('/getplayers', getPlayers);
router.get('/getplayer/:id', getPlayer);
router.patch('/updateplayer/:id/:type', updatePlayerStats);
router.post('/loginplayer', loginPlayer);
router.patch('/changeusername/:id', changeUsername);
router.patch('/changepassword/:id', changePassword);
router.patch('/changeemail/:id', changeEmail);

export default router;