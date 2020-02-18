const groupRouter = require('express').Router()
const { validateGroup, validateUserGroup } = require('../services/validation')
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
  .post('/', validateGroup, createGroup)
  .get('/:groupId', getGroupById)
  .patch('/:groupId', validateGroup, updateGroup)
  .delete('/:groupId', deleteGroup)
  .post('/addUsers', validateUserGroup, addUsersToGroup)

module.exports = groupRouter
