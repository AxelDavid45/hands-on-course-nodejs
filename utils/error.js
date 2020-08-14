'use strict';

function errorWithStatus(message, status = 500) {
  const err = new Error(message);
  err.statusCode = status;
  return err;
}

module.exports = errorWithStatus;
