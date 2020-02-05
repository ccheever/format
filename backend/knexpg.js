let secret = require('./secret');

module.exports = require('knex')({
  client: 'pg',
  connection: {
    host: secret.postgres.host,
    user: secret.postgres.user,
    password: secret.postgres.password,
    database: secret.postgres.database,
  },
});
