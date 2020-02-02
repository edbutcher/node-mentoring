import Joi from '@hapi/joi'

const userSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/).required(),
  age: Joi.number().integer().min(4).max(130).required()
})

export default userSchema
