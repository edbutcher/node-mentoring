import Joi from '@hapi/joi'
import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation'

export interface UserSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
      login: string;
      password: string;
      age: number;
    };
}

export const userSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/).required(),
    age: Joi.number().integer().min(4).max(130).required()
})
