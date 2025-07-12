const express = require('express');
const Item = require('../models/Item');
const { verifyAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/pending', verifyAdmin, async (req, res) => {
  const items = await Item.find({ approved: false });
  res.json(items);
});

router.post('/approve/:id', verifyAdmin, async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, { approved: true });
  res.json({ message: 'Item approved' });
});

router.delete('/reject/:id', verifyAdmin, async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item deleted' });
});

router.post('/flag/:id', async (req, res) => {
  await Item.findByIdAndUpdate(req.params.id, { flagged: true });
  res.json({ message: 'Item flagged for review' });
});

module.exports = router;
