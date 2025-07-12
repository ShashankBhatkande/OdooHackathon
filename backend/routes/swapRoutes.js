const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const swapController = require('../controllers/swapController');

router.post('/swaps/request', auth, swapController.requestSwap);
router.post('/swaps/redeem/:id', auth, swapController.redeemItem);

module.exports = router;
