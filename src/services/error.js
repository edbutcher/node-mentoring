const logger = require('./logger')

class CustomError extends Error {
  constructor(code, message, ...params) {
    super(params)
    this.code = code
    this.message = message
  }
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const code = err.code || 500
  const message = err.code ? err.message : 'Unexpected error'
  const place = err.stack.match(/\((\S+)\)/)[1]
  const functionName = err.stack.match(/at\s(\S+)\s/)[1]

  logger.log({
    level: 'error',
    place,
    functionName,
    message: err.message
  })

  res.status(code).json({ code, message })
}

module.exports = {
  CustomError,
  errorHandler
}
