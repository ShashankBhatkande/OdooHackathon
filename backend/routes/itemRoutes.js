const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const itemController = require('../controllers/itemController');
const isAdmin = require('../middleware/isAdmin');

router.post('/items', auth, itemController.createItem);
router.get('/items', itemController.getAllItems);
router.get('/items/:id', itemController.getItemById);
router.delete('/items/:id', auth, itemController.deleteItem);
router.put('/items/:id/status', auth, isAdmin, itemController.updateItemStatus);

module.exports = router;
