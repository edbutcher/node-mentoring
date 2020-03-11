const { createLogger, format, transports } = require('winston')

const infoFormat = format.printf(({ level, query, body, headers }) => {
  return `[${level}] ${JSON.stringify(query)} ${JSON.stringify(body)} ${JSON.stringify(headers)}`
})

const errorFormat = format.printf((info) => {
  return `[${info.level}] [${info.place} -> ${info.functionName}]: ${info.message}`
})

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'error',
      format: format.combine(
        format.colorize(),
        errorFormat
      )
    }),
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize(),
        infoFormat
      )
    })
  ],
  exitOnError: false
})

module.exports = logger
