const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

router.get('/pending', verifyAdmin, adminController.getPendingItems);
router.post('/approve/:id', verifyAdmin, adminController.approveItem);
router.delete('/reject/:id', verifyAdmin, adminController.rejectItem);
router.post('/flag/:id', adminController.flagItem);

module.exports = router;
