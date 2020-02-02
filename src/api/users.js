import { Router } from 'express'
import { createValidator } from 'express-joi-validation'
import userSchema from '../services/userValidation'
import {
  getAllUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/users'

const userRouter = Router()
const validator = createValidator()

userRouter
  .get('/', getAllUser)
  .post('/', validator.body(userSchema), createUser)
  .get('/:userId', getUserById)
  .patch('/:userId', validator.body(userSchema), updateUser)
  .delete('/:userId', deleteUser)

export default userRouter
