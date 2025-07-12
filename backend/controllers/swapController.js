const knex = require('../db/knex');

exports.requestSwap = async (req, res) => {
  try {
    const { itemId } = req.body;

    const item = await knex('items').where({ id: itemId, status: 'approved' }).first();
    if (!item) return res.status(404).json({ message: 'Item not available' });

    await knex('swaps').insert({
      initiator_id: req.user.id,
      item_id: itemId,
      status: 'pending'
    });

    res.json({ message: 'Swap request sent' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to request swap', details: err.message });
  }
};

exports.redeemItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const user = await knex('users').where({ id: req.user.id }).first();

    if (user.points < 50) { // assume 50 points needed
      return res.status(400).json({ message: 'Insufficient points' });
    }

    await knex('items').where({ id: itemId }).update({ status: 'redeemed' });
    await knex('users').where({ id: req.user.id }).update({ points: user.points - 50 });

    res.json({ message: 'Item redeemed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to redeem', details: err.message });
  }
};
