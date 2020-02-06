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

const groupSchema = Joi.object({
  name: Joi.string().required(),
  permissions: Joi.array().items(Joi.string().valid(
    'READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'
  )).required()
})
const validateGroup = validator.body(groupSchema)

module.exports = {
  validateUser,
  validateGroup
}
