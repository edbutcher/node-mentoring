module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'Groups',
      [
        {
          name: 'js fans',
          permissions: ['READ', 'WRITE'],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'node.js fans',
          permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('Groups', null, {})
  }
}
