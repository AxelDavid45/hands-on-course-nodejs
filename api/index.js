'use strict'
const express = require('express')
const app = express()
const config = require('../config')
const user = require('./components/user/routes');

// Parser
app.use(express.json());

// Router
app.use('/api/user', user)

app.listen(config.api.port, () => console.log('Listening on port', config.api.port))

