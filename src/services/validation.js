const Joi = require('@hapi/joi')
const { createValidator } = require('express-joi-validation')

const validator = createValidator()

const userSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string()
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
    .required(),
  age: Joi.number()
    .integer()
    .min(4)
    .max(130)
    .required()
})
const validateUser = validator.body(userSchema)

const loginSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required()
})
const validateLogin = validator.body(loginSchema)

const groupSchema = Joi.object({
  name: Joi.string().required(),
  permissions: Joi.array().items(Joi.string().valid(
    'READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'
  )).required()
})
const validateGroup = validator.body(groupSchema)

const userGroupSchema = Joi.object({
  groupId: Joi.number().required(),
  userIds: Joi.array().items(Joi.number()).required()
})
const validateUserGroup = validator.body(userGroupSchema)

module.exports = {
  validateUser,
  validateLogin,
  validateGroup,
  validateUserGroup
}
