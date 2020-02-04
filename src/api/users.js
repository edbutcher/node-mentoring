import { Router } from 'express'
import { validateUser } from '../services/validation'
import {
  getAllUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/users'

const userRouter = Router()

userRouter
  .get('/', getAllUser)
  .post('/', validateUser, createUser)
  .get('/:userId', getUserById)
  .patch('/:userId', validateUser, updateUser)
  .delete('/:userId', deleteUser)

export default userRouter
