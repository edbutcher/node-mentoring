import express, { json } from 'express'
import logger from 'morgan'
import apiRouter from './api'
import { errorHandler } from './services/error'
import dotenv from 'dotenv'

dotenv.config()

const PORT = parseInt(process.env.APP_PORT, 10)
const app = express()

app.use(json())
app.use(logger(':method :url :status :res[content-length] - :response-time ms'))
app.use('/api', apiRouter)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}/`))
