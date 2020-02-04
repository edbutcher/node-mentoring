import { Router } from 'express'
import cacheControl from 'express-cache-controller'
import userRouter from './users'

const apiRouter = Router()

apiRouter
  .get('*', cacheControl({ maxAge: 600, private: true }))
  .use('/users', userRouter)

export default apiRouter
