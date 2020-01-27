import express from 'express'
import { Sequelize } from 'sequelize'
import userRouter from './api/users'
import usersSeeder from './seeders/users'

const app = express()

app.listen(3000, () => console.log('Example app listening on http://localhost:3000/'))
app.use(express.json())
app.use('/api', userRouter)

export const connection = new Sequelize('mentoring_database', 'mentoring_user', 'pass1234', {
  host: 'localhost',
  dialect: 'postgres'
})

connection
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err))

usersSeeder(connection)
