class CustomError extends Error {
  constructor(statusCode, message) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}

function errorHandler(err, req, res) {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Unexpected error'

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  })
}

module.exports = {
  CustomError,
  errorHandler
}
