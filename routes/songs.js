const express = require('express');
const router = express.Router();

const {getSongs, getAlbumSongs, postSongs} = require('../controllers/songController.js');

router.get('/', getSongs);

router.get('/album-songs', getAlbumSongs);

router.post('/', postSongs);

exports.songRouter = router;