const express = require('express')
require('express-async-errors')
require('dotenv').config()

const { errorHandler } = require('./services/error')
const logHandler = require('./services/logHandler')
const apiRouter = require('./api')

const PORT = parseInt(process.env.APP_PORT, 10)
const app = express()

app.use(express.json())
app.use(logHandler)
app.use('/api', apiRouter)
app.use(errorHandler)

app.listen(PORT)
