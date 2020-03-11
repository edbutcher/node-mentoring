const express = require('express')
require('express-async-errors')
require('dotenv').config()
const cors = require('cors')

const { errorHandler } = require('./services/error')
const logHandler = require('./services/logHandler')
const apiRouter = require('./api')

const PORT = parseInt(process.env.APP_PORT, 10)
const app = express()

app.use(express.json())
app.use(logHandler)
app.use(cors())

app.use('/api', apiRouter)
app.use(errorHandler)

app.listen(PORT)
