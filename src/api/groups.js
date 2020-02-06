const groupRouter = require('express').Router()
const { validateGroup } = require('../services/validation')
const {
  getAllGroups,
  createGroup,
  getGroupById,
  updateGroup,
  deleteGroup
} = require('../controllers/groups')

groupRouter
  .get('/', getAllGroups)
  .post('/', validateGroup, createGroup)
  .get('/:groupId', getGroupById)
  .patch('/:groupId', validateGroup, updateGroup)
  .delete('/:groupId', deleteGroup)

module.exports = groupRouter
