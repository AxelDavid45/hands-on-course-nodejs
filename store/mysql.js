'use strict';
const mysql = require('mysql');
const config = require('../config');

const dbOptions = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let connection;

function handleConnection() {
  connection = mysql.createConnection(dbOptions);
  connection.connect(function mysqlConnectionCallback(err) {
    if (err) {
      console.error('[db error]', err);
      setTimeout(handleConnection, 2000);
    }
    console.log('DB connected');
  });
}

// Connect
handleConnection();

function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
}

module.exports = {
  list,
};
