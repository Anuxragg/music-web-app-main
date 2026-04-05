const express = require('express');
const { protect } = require('../middleware/auth');
const userController = require('../controllers/userController');

const router = express.Router();

router.use(protect);

router.get('/me', userController.getProfile);
router.patch('/me', userController.updateProfile);
router.get('/me/likes', userController.getLikedSongs);
router.post('/me/likes/:songId', userController.toggleLikeSong);
router.get('/:id', userController.getProfile);

module.exports = router;
