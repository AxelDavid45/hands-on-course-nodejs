'use strict';
const response = require('./response');

function errorsMiddleware(err, req, res, next) {
  console.error(`${Date.now()}:[Error] ${err}`);
  const message = err.message;
  const status = err.statusCode;
  response.error(req, res, message, status);
}

module.exports = errorsMiddleware;
