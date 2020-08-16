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

function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} WHERE id = ?`,
      id,
      (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
}

function insert(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, results) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
}

function update(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${table} SET ? WHERE id = ${data.id}`,
      data,
      (err, result) => {
        if (err) return reject(err);
        return resolve(data);
      }
    );
  });
}

function query(table, query, join = '') {
  return new Promise((resolve, reject) => {
    const joinKey = Object.keys(join)[0];
    const value = join[joinKey];
    console.log(joinKey, value);
    const joinQuery = `INNER JOIN ${joinKey} ON ${joinKey}.id = ${table}.${value}`;
    connection.query(
      `SELECT * FROM ${table} ${joinQuery} WHERE ?`,
      query,
      (err, results) => {
        if (err) return reject(err);
        return resolve(results[0]) || null;
      }
    );
  });
}

module.exports = {
  list,
  get,
  insert,
  query,
  update,
};
