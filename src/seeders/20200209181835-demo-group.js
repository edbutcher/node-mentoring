module.exports = {
  up: async queryInterface => {
    return await queryInterface.bulkInsert(
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
  down: async queryInterface => {
    return await queryInterface.bulkDelete('Groups', null, {})
  }
}
