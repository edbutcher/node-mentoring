const express = require('express')
const logger = require('morgan')
const apiRouter = require('./api')
const { errorHandler } = require('./services/error')
require('dotenv').config()

const PORT = parseInt(process.env.APP_PORT, 10)
const app = express()

app.use(express.json())
app.use(logger(':method :url :status :res[content-length] - :response-time ms'))
app.use('/api', apiRouter)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}/`))
