const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

router.get('/pending', verifyAdmin, adminController.getPendingItems);
router.put('/approve/:id', verifyAdmin, adminController.approveItem);
router.put('/reject/:id', verifyAdmin, adminController.rejectItem);
router.put('/flag/:id', adminController.flagItem);

module.exports = router;
