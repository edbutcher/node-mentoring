import logger from 'morgan'

export class CustomError extends Error {
  constructor(statusCode, message) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}

export const errorHandler = (err, req, res) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Unexpected error'
  logger.error({
    status: 'error',
    statusCode,
    message
  })

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  })
}
