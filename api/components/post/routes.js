'use strict';
const express = require('express');
const response = require('../../../network/response');
const Controller = require('./index');
const router = express.Router();

router.get('/', list);

async function list(req, res, next) {
  try {
    const body = await Controller.list();
    response.success(req, res, body);
  } catch (err) {
    next(err);
  }
}

module.exports = router;
