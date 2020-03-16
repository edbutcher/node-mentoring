const apiRouter = require('express').Router()
const cacheControl = require('express-cache-controller')

const login = require('../controllers/login')
const userRouter = require('./users')
const groupRouter = require('./groups')

const checkToken = require('../services/checkToken')
const { validateLogin } = require('../services/validation')

apiRouter
  .post('/login', validateLogin, login)
  .get('*', checkToken, cacheControl({ maxAge: 600, private: true }))
  .use('/users', checkToken, userRouter)
  .use('/groups', checkToken, groupRouter)

module.exports = apiRouter
