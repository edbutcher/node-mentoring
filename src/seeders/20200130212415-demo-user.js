const { User } = require('../models')

module.exports = {
  up: async queryInterface => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          login:'John Doe',
          password: User.generateHash('John Doe'),
          age: 50,
          isDeleted: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          login: 'John Snow',
          password: User.generateHash('John Snow'),
          age: 20,
          isDeleted: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          login: 'Deleted User',
          password: User.generateHash('Deleted User'),
          age: 99,
          isDeleted: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {
        individualHooks: true,
        validate: true
      }
    )
  },
  down: async queryInterface => {
    return await queryInterface.bulkDelete('Users', null, {})
  }
}
