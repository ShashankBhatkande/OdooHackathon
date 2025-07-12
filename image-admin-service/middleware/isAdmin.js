const knex = require('../db/knex');

module.exports = async function (req, res, next) {
  try {
    const user = await knex('users').where({ id: req.user.id }).first();

    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: Admins only' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
