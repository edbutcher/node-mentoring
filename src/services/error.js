const logger = require('./logger')

class CustomError extends Error {
  constructor(code, message) {
    super()
    this.code = code
    this.message = message
  }
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const code = err.code || 500
  const message = err.code ? err.message : 'Unexpected error'

  logger.log({
    level: 'error',
    message,
    method: req.method,
    url: req.url,
    params: req.body
  })

  res.status(code).json({ code, message })
}

module.exports = {
  CustomError,
  errorHandler
}
