const userRouter = require('express').Router()
const { userValidator } = require('../services/validators')
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/users')

userRouter
  .get('/', getAllUsers)
  .post('/', userValidator, createUser)
  .get('/:userId', getUserById)
  .patch('/:userId', userValidator, updateUser)
  .delete('/:userId', deleteUser)

module.exports = userRouter
