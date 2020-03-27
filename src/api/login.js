const loginRouter = require('express').Router()
const { loginValidator } = require('../services/validators')
const login = require('../controllers/login')

loginRouter.post('/', loginValidator, login)

module.exports = loginRouter
