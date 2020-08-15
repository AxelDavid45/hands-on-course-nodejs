'use strict';
const express = require('express');
const checkAuthMiddleware = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');
const router = express.Router();

router.get('/', listUsers);
router.get('/:id', filterUser);
router.post('/', insert);
router.put('/', checkAuthMiddleware('update'), update);

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

async function insert(req, res, next) {
  try {
    const message = await Controller.insert(req.body);
    response.success(req, res, message, 201);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {}

module.exports = router;
