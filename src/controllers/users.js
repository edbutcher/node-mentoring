import Sequelize from 'sequelize'
import models from '../models'
const { User } = models

export const getAllUser = async (req, res) => {
  try {
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

    res.status(200).json({ users })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error })
  }
}

export const getUserById = async (req, res) => {
  try {
    const id = req.params.userId
    const user = await User.findByPk(id)

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

export const updateUser = async (req, res) => {
  try {
    const id = req.params.userId
    if (!id) throw Error('"id" field is required')

    const { login, password, age } = req.body
    const user = await User.update(
      { id, login, password, age },
      { where: { id } }
    )

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.userId
    await User.update(
      { isDeleted: true },
      { where: { id } }
    )

    res.sendStatus(200)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

