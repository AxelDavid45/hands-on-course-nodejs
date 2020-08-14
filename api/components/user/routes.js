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

function listUsers(req, res) {
  Controller.list()
    .then((message) => response.success(req, res, message))
    .catch((err) => response.error(req, res, err.message));
}

function filterUser(req, res) {
  Controller.get(req.params.id)
    .then((message) => response.success(req, res, message))
    .catch((err) => response.error(req, res, err.message));
}

async function upsert(req, res) {
  try {
    const message = await Controller.upsert(req.body);
    response.success(req, res, message, 201);
  } catch (err) {
    response.error(req, res, err.message, 400);
  }
}

module.exports = router;
