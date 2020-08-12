'use strict'
const express = require('express')
const response = require('../../../network/response')
const Controller = require('./index')
const router = express.Router()

router.get('/', (req, res) => {
  const message = Controller.list()
  response.success(req, res, message, 200)
})

router.get('/:id', (req, res) => {
})

module.exports = router
