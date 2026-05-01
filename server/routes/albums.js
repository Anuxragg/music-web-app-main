const express = require('express');
const { protect } = require('../middleware/auth');
const albumController = require('../controllers/albumController');

const router = express.Router();

router.use(protect);

router.post('/', albumController.createAlbum);
router.get('/', albumController.getMyAlbums);
router.get('/:id', albumController.getAlbum);
router.patch('/:id', albumController.updateAlbum);
router.delete('/:id', albumController.deleteAlbum);

module.exports = router;
