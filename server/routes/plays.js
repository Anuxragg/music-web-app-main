const express = require('express');
const { protect } = require('../middleware/auth');
const playController = require('../controllers/playController');

const router = express.Router();

router.use(protect);

router.post('/', playController.logPlay);
router.get('/history', playController.getHistory);
router.get('/stats', playController.getStats);

module.exports = router;
