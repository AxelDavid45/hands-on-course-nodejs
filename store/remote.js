'use strict';
const http = require('http');
module.exports = function remote(host, port) {
  function list(table) {
    return request('GET', table);
  }

  function get(table, id) {
    return request('GET', `${table}/${id}`);
  }

  function insert(table, data) {
    return request('POST', table, data);
  }

  function request(method, path, body = '') {
    const options = {
      hostname: host,
      port: port,
      path: `/${path}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
        res.on('error', (err) => {
          console.error(err.message);
          return reject(err);
        });

        res.on('data', (chunk) => {
          const response = JSON.parse(chunk.toString()).body;
          return resolve(response);
        });
      });
      req.write(JSON.stringify(body));
      req.end();
    });
  }

  return {
    list,
    get,
    insert,
  };
};
