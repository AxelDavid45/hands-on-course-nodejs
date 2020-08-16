'use strict';
const config = require('../config');
const remote = require('./remote');

module.exports = remote(config.mysqlService.host, config.mysqlService.port);
