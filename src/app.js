const express = require('express')
require('express-async-errors')
const { errorHandler } = require('./services/error')
const logger = require('./services/logger')
require('dotenv').config()

const apiRouter = require('./api')

const PORT = parseInt(process.env.APP_PORT, 10)
const app = express()

app.use(express.json())
app.use('/api', apiRouter)
app.use(errorHandler)

app.listen(PORT, () => logger.info(`Running on http://localhost:${PORT}/`))
