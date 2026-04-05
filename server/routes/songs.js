const express = require('express');
const { protect, artistOnly } = require('../middleware/auth');
const songController = require('../controllers/songController');

const router = express.Router();

router.get('/', songController.getSongs);
router.get('/trending', songController.getTrending);
router.get('/:id', songController.getSong);
router.post('/', protect, artistOnly, songController.songUploadMiddleware, songController.createSong);
router.delete('/:id', protect, artistOnly, songController.deleteSong);

module.exports = router;
