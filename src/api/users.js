const userRouter = require('express').Router()
const { validateUser } = require('../services/validation')
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/users')

userRouter
  .get('/', getAllUsers)
  .post('/', validateUser, createUser)
  .get('/:userId', getUserById)
  .patch('/:userId', validateUser, updateUser)
  .delete('/:userId', deleteUser)

module.exports = userRouter
