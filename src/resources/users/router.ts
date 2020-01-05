import { Router } from 'express'
import { createValidator } from 'express-joi-validation'
import cacheControl from 'express-cache-controller'

import { getAllUser, getUserById, createUser, updateUser, deleteUser } from './controller'
import { userSchema } from './model'

const userRouter = Router()
const validator = createValidator()

userRouter
    .get('*', cacheControl({ maxAge: 600, private: true }))
    .get('/users/', getAllUser)
    .get('/users/:userId', getUserById)
    .post('/users/', validator.body(userSchema), createUser)
    .patch('/users/:userId', validator.body(userSchema), updateUser)
    .delete('/users/:userId', deleteUser)

export default userRouter
