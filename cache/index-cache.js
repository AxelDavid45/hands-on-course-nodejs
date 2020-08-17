'use strict';
const express = require('express');
const app = express();
const config = require('../config');
const router = require('./routes');
// Body Parser
app.use(express.json());

// Routes
app.use('/', router);

app.listen(config.cacheService.port, () => {
  console.log('Listening in port ', config.cacheService.port);
});
