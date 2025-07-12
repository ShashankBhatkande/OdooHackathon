const Item = require('../models/Item');

exports.getPendingItems = async (req, res) => {
  try {
    const items = await Item.find({ approved: false });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch pending items' });
  }
};

exports.approveItem = async (req, res) => {
  try {
    await Item.findByIdAndUpdate(req.params.id, { approved: true });
    res.json({ message: 'Item approved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to approve item' });
  }
};

exports.rejectItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete item' });
  }
};

exports.flagItem = async (req, res) => {
  try {
    await Item.findByIdAndUpdate(req.params.id, { flagged: true });
    res.json({ message: 'Item flagged for review' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to flag item' });
  }
};
