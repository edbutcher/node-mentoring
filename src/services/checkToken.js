const jwt = require('jsonwebtoken')
const { CustomError } = require('./error')

module.exports = function checkToken(req, res, next) {
  const token = req.headers['x-access-token']
  if (!token) {
    throw new CustomError(401, 'Unauthorized.')
  }
  try {
    jwt.verify(token, process.env.APP_SECRET_KEY)
  } catch (error) {
    throw new CustomError(403, 'Forbidden.')
  }
  next()
}
