const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Item = require('../models/Item');
const { Readable } = require('stream');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const streamUpload = (fileBuffer, filename) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ public_id: filename }, (error, result) => {
      if (result) resolve(result.secure_url);
      else reject(error);
    });

    const readable = new Readable();
    readable._read = () => {};
    readable.push(fileBuffer);
    readable.push(null);
    readable.pipe(stream);
  });
};

router.post('/upload', upload.array('images', 5), async (req, res) => {
  try {
    const urls = await Promise.all(
      req.files.map((file) => streamUpload(file.buffer, file.originalname))
    );

    res.status(200).json({ imageUrls: urls });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

module.exports = router;
