const { createLogger, format, transports } = require('winston')

const myFormat = format.printf(({ level, method, url, params, message }) => {
  return `[${level}] ${method} ${url} ${JSON.stringify(params)}: ${message}`
})

const logger = createLogger({
  level: 'error',
  format: format.combine(
    format.colorize(),
    myFormat
  ),
  transports: [new transports.Console()]
})

module.exports = logger
