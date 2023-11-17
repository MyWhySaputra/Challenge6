const express = require('express')
const galeryRoute = require('./galery.route')
const authRoute = require('./auth.route')
const morgan = require('morgan')

// version 1 
const v1 = express.Router()
v1.use(morgan('dev'));
v1.use('/', [galeryRoute, authRoute])

const router = express.Router()
router.use('/api/v1', v1)

// default version
router.use('/api', v1)

module.exports = router