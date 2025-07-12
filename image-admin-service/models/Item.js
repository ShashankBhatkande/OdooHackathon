const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  images: [String],
  approved: { type: Boolean, default: false },
  flagged: { type: Boolean, default: false },
  uploader: String,
});

module.exports = mongoose.model('Item', itemSchema);
