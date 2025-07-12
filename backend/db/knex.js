const knex = require('knex');
const config = {
  client: 'sqlite3',
  connection: {
    filename: './rewear.sqlite3'
  },
  useNullAsDefault: true
};

module.exports = knex(config);
