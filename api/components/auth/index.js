/**
 * This file works as a dependency injection for our controller
 * when we need to change the store we just need to change it here
 * */
const store = require('../../../store/mysql');
const controller = require('./controller');

module.exports = controller(store);
