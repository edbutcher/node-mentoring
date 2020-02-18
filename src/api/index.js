const apiRouter = require('express').Router()
const cacheControl = require('express-cache-controller')

const userRouter = require('./users')
const groupRouter = require('./groups')

apiRouter
  .get('*', cacheControl({ maxAge: 600, private: true }))
  .use('/users', userRouter)
  .use('/groups', groupRouter)

module.exports = apiRouter
