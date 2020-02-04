import Sequelize from 'sequelize'
import { CustomError } from '../services/error'
import models from '../models'
const { User } = models

export const getAllUser = async (req, res) => {
  const { loginSubstring, limit } = req.query

  const users = await User.findAll({
    limit: limit || 10,
    where: {
      isDeleted: false,
      login: {
        [Sequelize.Op.iLike]: `%${loginSubstring || ''}%`
      }
    },
    order: [
      ['login', 'ASC']
    ]
  })

  res.json({ users })
}

export const getUserById = async (req, res) => {
  const id = req.params.userId
  const user = await User.findByPk(id)

  res.json(user)
}

export const createUser = async (req, res) => {
  const { login, password, age } = req.body
  const user = await User.create({ login, password, age })

  res.status(201).json(user)
}

export const updateUser = async (req, res) => {
  const id = req.params.userId
  if (!id) throw CustomError(400, '"id" field is required')

  const { login, password, age } = req.body
  const user = await User.update(
    { id, login, password, age },
    { where: { id } }
  )

  res.json(user)
}

export const deleteUser = async (req, res) => {
  const id = req.params.userId
  await User.update(
    { isDeleted: true },
    { where: { id } }
  )

  res.sendStatus(200)
}
