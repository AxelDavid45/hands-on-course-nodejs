'use strict';
const jwt = require('jsonwebtoken');

function sign(payload) {
  return jwt.sign(payload, 'secret');
}

module.exports = {
  sign,
};
