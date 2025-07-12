const knex = require('../db/knex'); // path to knex config

exports.createItem = async (req, res) => {
  try {
    const { title, description, category, type, size, condition, tags, images } = req.body;
    const owner_id = req.user.id;

    await knex('items').insert({
      owner_id, title, description, category, type, size, condition, tags, images, status: 'pending'
    });

    res.status(201).json({ message: 'Item added successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Error creating item', details: err.message });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const items = await knex('items').where('status', 'approved');
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching items', details: err.message });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await knex('items').where({ id }).first();
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching item', details: err.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await knex('items').where({ id }).first();
    if (!item) return res.status(404).json({ message: 'Item not found' });

    // Only owner can delete
    if (item.owner_id !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this item' });
    }

    await knex('items').where({ id }).del();
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting item', details: err.message });
  }
};

exports.updateItemStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    await knex('items').where({ id }).update({ status });
    res.json({ message: `Item ${status}` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update item status', details: err.message });
  }
};
