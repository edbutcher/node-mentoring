import express from 'express'
import userRouter from './resources/users/router'

const app: express.Application = express()

app.listen(3000, () => console.log('Example app listening on http://localhost:3000/'))
app.use(express.json())
app.use('/api', userRouter)
