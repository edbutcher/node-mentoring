const logger = require('./logger')

module.exports = (req, res, next) => {
  logger.log({
    level: 'info',
    method: req.method,
    url: req.url,
    query: req.query,
    param: req.param,
    body: req.body,
    headers: req.headers
  })
  next()
}
