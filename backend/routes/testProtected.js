const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');

router.get('/me', authenticateToken, (req, res) => {
  res.json({
    message: 'Protected route accessed',
    user: req.user  // Contains id, email, role from token
  });
});

module.exports = router;