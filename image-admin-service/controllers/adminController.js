const axios = require('axios');

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000/api';

exports.getPendingItems = async (req, res) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/items/pending`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch pending items', error: err.message });
  }
};

exports.approveItem = async (req, res) => {
  try {
    await axios.put(`${BACKEND_URL}/items/${req.params.id}/status`, {
      status: 'approved'
    });
    res.json({ message: 'Item approved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to approve item', error: err.message });
  }
};

exports.rejectItem = async (req, res) => {
  try {
    await axios.put(`${BACKEND_URL}/items/${req.params.id}/status`, {
      status: 'rejected'
    });
    res.json({ message: 'Item rejected successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to reject item', error: err.message });
  }
};

exports.flagItem = async (req, res) => {
  try {
    await axios.put(`${BACKEND_URL}/items/${req.params.id}/status`, {
      status: 'flagged'
    });
    res.json({ message: 'Item flagged for review' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to flag item', error: err.message });
  }
};
