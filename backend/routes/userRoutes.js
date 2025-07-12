const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const knex = require('../db/knex');

// GET /api/user/me → Logged-in user's profile info
router.get('/user/me', auth, async (req, res) => {
  try {
    const user = await knex('users').where({ id: req.user.id }).first();
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      id: user.id,
      email: user.email,
      role: user.role,
      points: user.points
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user profile', error: err.message });
  }
});

// GET /api/user/items → User's uploaded items
router.get('/user/items', auth, async (req, res) => {
  try {
    const items = await knex('items').where({ owner_id: req.user.id });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your items', error: err.message });
  }
});

// GET /api/user/swaps → Swaps initiated or involving the user's items
router.get('/user/swaps', auth, async (req, res) => {
  try {
    const initiatedSwaps = await knex('swaps')
      .join('items', 'swaps.item_id', 'items.id')
      .where('swaps.initiator_id', req.user.id)
      .select('swaps.*', 'items.title', 'items.images');

    const receivedSwaps = await knex('swaps')
      .join('items', 'swaps.item_id', 'items.id')
      .where('items.owner_id', req.user.id)
      .andWhere('swaps.initiator_id', '!=', req.user.id)
      .select('swaps.*', 'items.title', 'items.images');

    res.json({ initiatedSwaps, receivedSwaps });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch swaps', error: err.message });
  }
});

module.exports = router;
