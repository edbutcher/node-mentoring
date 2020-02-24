const Sequelize = require('sequelize')
const { CustomError } = require('../services/error')
const { User, UserGroup, sequelize } = require('../models')

async function getAllUsers(req, res) {
  const { loginSubstring, limit } = req.query

  const users = await User.findAll({
    limit: limit || 10,
    where: {
      isDeleted: false,
      login: {
        [Sequelize.Op.iLike]: `%${loginSubstring || ''}%`
      }
    },
    order: [['login', 'ASC']]
  })

  res.json({ users })
}

async function getUserById(req, res) {
  const id = req.params.userId
  const user = await User.findByPk(id)
  if (!user) throw new CustomError(400, `There is no user with id ${id}`)

  res.json(user)
}

async function createUser(req, res) {
  const { login, password, age } = req.body
  const user = await User.create({ login, password, age })

  res.status(201).json(user)
}

async function updateUser(req, res) {
  const id = req.params.userId
  if (!id) throw new CustomError(400, '"userId" field is required')

  const { login, password, age } = req.body
  await User.update({ id, login, password, age }, { where: { id } })
  const user = await User.findByPk(id)

  res.json(user)
}

async function deleteUser(req, res) {
  let transaction
  try {
    const id = req.params.userId
    if (!id) throw new CustomError(400, '"userId" field is required')

    transaction = await sequelize.transaction()
    await UserGroup.destroy({ where: { userId: id }, transaction })
    await User.update({ isDeleted: true }, { where: { id }, transaction })

    transaction.commit()
    res.sendStatus(200)
  } catch (error) {
    transaction.rollback()
    throw new CustomError(400, error.message)
  }
}

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
}
