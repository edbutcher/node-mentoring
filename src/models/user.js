import { DataTypes, Sequelize } from 'sequelize'
import Joi from '@hapi/joi'
export const connection = new Sequelize('postgres://mentoring_user:pass1234@localhost:5432/mentoring_database')

connection
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err))

export const userSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/).required(),
  age: Joi.number().integer().min(4).max(130).required()
})

export const User = connection.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  freezeTableName: true
})
