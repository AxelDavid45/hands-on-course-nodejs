'use strict';
const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

function sign(payload) {
  return jwt.sign(payload, config.jwt.secret);
}

function verifyToken(token) {
  return jwt.verify(token, config.jwt.secret);
}

const check = {
  own: function (request, userId) {
    const decoded = decodeToken(request);
    if (decoded.id !== userId) throw error('Access denied', 401);
  },
  logged: function (request) {
    const decoded = decodeToken(request);
    console.log(decoded);
  },
};
function getToken(authHeader) {
  if (!authHeader) throw new Error('Missing authorization header');
  if (authHeader.indexOf('Bearer ') === -1)
    throw error('Authorization header bad format', 400);
  return authHeader.replace('Bearer ', '');
}

function decodeToken(request) {
  const authorizationHeader = request.headers.authorization || '';
  const token = getToken(authorizationHeader);
  const decoded = verifyToken(token);
  request.user = decoded;
  return decoded;
}

module.exports = {
  sign,
  check,
};
