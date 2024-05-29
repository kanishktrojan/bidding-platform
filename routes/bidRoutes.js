const express = require('express');
const { createBid, getBids } = require('../controllers/bidController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/:itemId/bids', getBids);
router.post('/:itemId/bids', authMiddleware, createBid);

module.exports = router;
