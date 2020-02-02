import express, { json } from 'express'
import logger from 'morgan'
import apiRouter from './api'

const app = express()
const PORT = parseInt(process.env.PORT, 10) || 3000

app.use(json())
app.use(logger('dev'))
app.use('/api', apiRouter)

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}/`))
