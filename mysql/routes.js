'use strict';
const express = require('express');
const response = require('../network/response');
const store = require('../store/mysql');
const router = express.Router();

router.get('/:table', list);
router.get('/:table/:id', filterById);
router.post('/:table', insert);
router.put('/:table', update);
router.get('/query/:table', query);

async function list(req, res, next) {
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

async function query(req, res, next) {
  try {
    const message = await store.query(
      req.params.table,
      req.body.query,
      req.body.join
    );
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

async function update(req, res, next) {
  try {
    const message = await store.update(req.params.table, req.body);
    response.success(req, res, message);
  } catch (err) {
    response.error(req, res, err, 500);
  }
}
module.exports = router;
