'use strict';
const express = require('express');
const checkAuthMiddleware = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');
const router = express.Router();

router.get('/', listUsers);
router.get('/:id', filterUser);
router.post('/', upsert);
router.put('/', checkAuthMiddleware('update'), upsert);

function listUsers(req, res, next) {
  Controller.list()
    .then((message) => response.success(req, res, message))
    .catch(next);
}

function filterUser(req, res, next) {
  Controller.get(req.params.id)
    .then((message) => response.success(req, res, message))
    .catch(next);
}

async function upsert(req, res, next) {
  try {
    const message = await Controller.upsert(req.body);
    response.success(req, res, message, 201);
  } catch (err) {
    next(err);
  }
}

module.exports = router;
