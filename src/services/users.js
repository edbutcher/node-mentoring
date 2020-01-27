import { User } from '../models/user'

export const getAllUser = (req, res) => {
  try {
    const users = User.findAll()
    console.log(users)
    res.status(200).json({ users })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const getUserById = (req, res) => {
  try {
    const user = User.findById(req.params.userId)

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const createUser = async (req, res) => {
  try {
    const { login, password, age } = req.body
    const user = await User.create({ login, password, age })

    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const updateUser = (req, res) => {
  try {
    const id = req.params.userId
    if (!id) throw Error('"id" field is required')
    const { login, password, age } = req.body
    const user = User.updateUser({ id, login, password, age })

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const deleteUser = (req, res) => {
  try {
    User.deleteUser(req.params.userId)
    res.sendStatus(200)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export default {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
