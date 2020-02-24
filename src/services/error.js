const logger = require('./logger')

class CustomError extends Error {
  constructor(code, message) {
    super()
    this.code = code
    this.message = message
  }
}

function errorHandler(err, req, res, next) {
  const code = err.code || 500
  const message = err.message || 'Unexpected error'

  logger.log({
    level: 'error',
    message,
    method: req.method,
    url: req.url,
    params: req.body
  })

  res.status(code).json({
    status: 'error',
    code,
    message
  })
  next()
}

module.exports = {
  CustomError,
  errorHandler
}
