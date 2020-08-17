'use strict';
const redis = require('redis');
const config = require('../config');

const redisClient = redis.createClient({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
  database: 'axelespinosatests',
});

function list(table) {
  return new Promise((resolve, reject) => {
    redisClient.get(table, (err, reply) => {
      if (err) return reject(err);
      return resolve(JSON.parse(reply));
    });
  });
}

function insert(table, data) {
  redisClient.set(`${table}`, JSON.stringify(data));
  return true;
}

module.exports = {
  list,
  insert,
};
