const express = require('express');
const { protect, artistOnly } = require('../middleware/auth');
const albumController = require('../controllers/albumController');

const router = express.Router();

router.get('/', albumController.getAlbums);
router.get('/:id', albumController.getAlbum);
router.post('/', protect, artistOnly, albumController.createAlbum);
router.patch('/:id', protect, artistOnly, albumController.updateAlbum);
router.delete('/:id', protect, artistOnly, albumController.deleteAlbum);
router.post('/:id/songs', protect, artistOnly, albumController.addSongToAlbum);

module.exports = router;
