export function up(queryInterface) {
  return queryInterface.bulkInsert('Users', [{
    login: 'John Doe',
    password: 'John Doe',
    age: 50,
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    login: 'John Snow',
    password: 'John Snow',
    age: 20,
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    login: 'Deleted User',
    password: 'Deleted User',
    age: 99,
    isDeleted: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {})
}
export function down(queryInterface) {
  return queryInterface.bulkDelete('Users', null, {})
}
