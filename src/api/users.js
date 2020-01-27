import { Router } from 'express'
import { createValidator } from 'express-joi-validation'
import cacheControl from 'express-cache-controller'
import { userSchema } from '../models/user'
import useService from '../services/users'

const userRouter = Router()
const validator = createValidator()

userRouter
  .get('*', cacheControl({ maxAge: 600, private: true }))
  .get('/users/', useService.getAllUser)
  .get('/users/:userId', useService.getUserById)
  .post('/users/', validator.body(userSchema), useService.createUser)
  .patch('/users/:userId', validator.body(userSchema), useService.updateUser)
  .delete('/users/:userId', useService.deleteUser)

export default userRouter
