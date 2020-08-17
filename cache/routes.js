'use strict';
const express = require('express');
const response = require('../network/response');
const store = require('../store/redis');
const router = express.Router();

router.get('/:table', listKeys);
router.get('/:table/:id', filterById);
router.post('/:table', insert);

async function listKeys(req, res, next) {
  try {
    const message = await store.list(req.params.table);
    response.success(req, res, message);
  } catch (err) {
    response.error(req, res, err, 500);
  }
}

async function filterById(req, res, next) {
  try {
    const message = await store.get(req.params.table, req.params.id);
    response.success(req, res, message);
  } catch (err) {
    response.error(req, res, err, 500);
  }
}

async function insert(req, res, next) {
  try {
    const message = await store.insert(req.params.table, req.body);
    response.success(req, res, message);
  } catch (err) {
    response.error(req, res, err, 500);
  }
}
module.exports = router;
