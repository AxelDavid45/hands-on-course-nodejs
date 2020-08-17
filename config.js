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
  mysqlService: {
    host: process.env.MYSQL_SRV_HOST || 'localhost',
    port: process.env.MYSQL_SRV_PORT || 3001,
  },
  posts: {
    port: process.env.POSTS_PORT || 3002,
  },
  cacheService: {
    port: process.env.CACHE_PORT || 3003,
  },
  redis: {
    host:
      process.env.REDIS_HOST ||
      'redis-19672.c93.us-east-1-3.ec2.cloud.redislabs.com',
    port: process.env.REDIS_PORT || 19672,
    password: process.env.REDIS_PASS || 'IrJz7hfX3MWgLe1o8bR8UpEBMXlTPPke',
  },
};
