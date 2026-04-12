const express = require('express');
const { protect, artistOnly } = require('../middleware/auth');
const songController = require('../controllers/songController');

const router = express.Router();

router.get('/', songController.getSongs);
router.get('/trending', songController.getTrending);
router.get('/:id', songController.getSong);

// Integrated multer error handling
router.post('/', protect, artistOnly, (req, res, next) => {
  songController.songUploadMiddleware(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: 'File too large. Max limit is 50MB.' });
      }
      return res.status(400).json({ success: false, message: 'Upload error: ' + err.message });
    }
    next();
  });
}, songController.createSong);

router.put('/rename-album/bulk', protect, artistOnly, songController.renameAlbum);
router.patch('/:id', protect, artistOnly, (req, res, next) => {
  songController.songUploadMiddleware(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, message: 'Upload error: ' + err.message });
    next();
  });
}, songController.updateSong);
router.put('/:id', protect, artistOnly, songController.updateSong);

router.delete('/:id', protect, artistOnly, songController.deleteSong);

module.exports = router;
