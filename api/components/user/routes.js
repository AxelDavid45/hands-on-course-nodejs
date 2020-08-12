'use strict'
const express = require('express')
const response = require('../../../network/response')
const Controller = require('./index')
const router = express.Router()

router.get('/', (req, res) => {
  Controller.list()
    .then(message => response.success(req, res, message))
    .catch(err => response.error(req, res, err.message));
})

router.get('/:id', (req, res) => {
  console.log(req.params.id);
  Controller.get(req.params.id)
    .then(message => response.success(req, res, message))
    .catch(err => response.error(req, res, err.message));
})

module.exports = router
