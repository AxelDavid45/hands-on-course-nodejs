'use strict';
const express = require('express');
const checkAuthMiddleware = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');
const router = express.Router();

router.get('/', listUsers);
router.get('/:id', filterUser);
router.get('/:id/following', following);
router.post('/', insert);
router.put('/', checkAuthMiddleware('update'), update);
router.post('/follow/:id', checkAuthMiddleware('follow'), follow);

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

async function update(req, res, next) {
  try {
    const message = await Controller.update(req.body);
    response.success(req, res, message, 200);
  } catch (err) {
    next(err);
  }
}

async function follow(req, res, next) {
  try {
    const message = await Controller.follow(req.user.id, req.params.id);
    response.success(req, res, message, 201);
  } catch (err) {
    next(err);
  }
}

async function following(req, res, next) {
  try {
    const message = await Controller.followers(req.params.id);
    response.success(req, res, message, 200);
  } catch (err) {
    next(err);
  }
}

module.exports = router;
