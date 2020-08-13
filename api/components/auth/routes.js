'use strict';
const express = require('express');
const response = require('../../../network/response');
const Controller = require('./index');
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const request = await Controller.login(
      req.body.username,
      req.body.password
    );
    response.success(req, res, request);
  } catch (e) {
    response.error(req, res, e.message, 400);
  }
});

module.exports = router;
