const groupRouter = require('express').Router()
const { groupValidator, userGroupValidator } = require('../services/validators')
const {
  getAllGroups,
  createGroup,
  getGroupById,
  updateGroup,
  deleteGroup,
  addUsersToGroup
} = require('../controllers/groups')

groupRouter
  .get('/', getAllGroups)
  .post('/', groupValidator, createGroup)
  .get('/:groupId', getGroupById)
  .patch('/:groupId', groupValidator, updateGroup)
  .delete('/:groupId', deleteGroup)
  .post('/addUsers', userGroupValidator, addUsersToGroup)

module.exports = groupRouter
