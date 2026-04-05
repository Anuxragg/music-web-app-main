const express = require('express');
const { protect } = require('../middleware/auth');
const playlistController = require('../controllers/playlistController');

const router = express.Router();

router.use(protect);

router.get('/me', playlistController.getMyPlaylists);
router.get('/:id', playlistController.getPlaylist);
router.post('/', playlistController.createPlaylist);
router.patch('/:id', playlistController.updatePlaylist);
router.delete('/:id', playlistController.deletePlaylist);
router.post('/:id/songs', playlistController.addSongToPlaylist);
router.delete('/:id/songs/:songId', playlistController.removeSongFromPlaylist);

module.exports = router;
