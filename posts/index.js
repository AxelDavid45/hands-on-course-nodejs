'use strict';
const express = require('express');
const app = express();
const config = require('../config');
const post = require('./components/post/routes');
const errorsMiddleware = require('../network/errors');
// Parser
app.use(express.json());

// Router
app.use('/api/post', post);

// Error Middleware
app.use(errorsMiddleware);

app.listen(config.posts.port, () =>
  console.log('Post service listening on port', config.posts.port)
);
