const jwt = require('jsonwebtoken')
const Sequelize = require('sequelize')
const { User } = require('../models')
const { CustomError } = require('../services/error')

module.exports = async (req, res) => {
  const { login, password } = req.body

  const users = await User.findAll({
    limit: 1,
    where: {
      login: {
        [Sequelize.Op.iLike]: `%${login}%`
      },
      password: {
        [Sequelize.Op.iLike]: `%${password}%`
      }
    }
  })
  const user = users[0]

  if (user === undefined || (user.login !== login && user.password !== password)) {
    throw new CustomError(403, 'Bad username/password combination.')
  }
  const payload = { 'sub': user.id }
  const token = jwt.sign(payload, process.env.APP_SECRET_KEY, { expiresIn: 2000 })

  res.send(token)
}
