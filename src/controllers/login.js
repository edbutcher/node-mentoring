const jwt = require('jsonwebtoken')
const { User } = require('../models')
const { CustomError } = require('../services/error')

module.exports = async (req, res) => {
  const { login, password } = req.body
  const user = await User.findOne({ where: { login } })

  if (user === undefined) {
    throw new CustomError(403, 'Bad username/password combination.')
  }

  const match = await user.validPassword(password)

  if (!match) {
    throw new CustomError(403, 'Bad username/password combination.')
  }

  const payload = { 'sub': user.id }
  const token = jwt.sign(payload, process.env.APP_SECRET_KEY, { expiresIn: 2000 })

  res.send(token)
}
