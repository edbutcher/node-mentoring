const apiRouter = require('express').Router()
const cacheControl = require('express-cache-controller')
const checkToken = require('../services/checkToken')

const loginRouter = require('./login')
const userRouter = require('./users')
const groupRouter = require('./groups')

apiRouter
  .use('/login', loginRouter)
  .get('*', checkToken, cacheControl({ maxAge: 600, private: true }))
  .use('/users', checkToken, userRouter)
  .use('/groups', checkToken, groupRouter)

module.exports = apiRouter
