'use strict';
module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'remotemysql.com',
    user: process.env.MYSQL_USR || 'Fd4GTkakrw',
    password: process.env.MYSQL_PASS || '4QxYx7HOZU',
    database: process.env.MYSQL_DB || 'Fd4GTkakrw',
  },
};
