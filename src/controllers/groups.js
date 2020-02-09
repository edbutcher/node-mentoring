const { CustomError } = require('../services/error')
const { Group, UserGroup, sequelize } = require('../models')

async function getAllGroups(req, res) {
  const groups = await Group.findAll({
    order: [['name', 'ASC']]
  })

  res.json({ groups })
}

async function getGroupById(req, res) {
  const id = req.params.groupId
  if (!id) throw CustomError(400, '"groupId" field is required')
  const group = await Group.findByPk(id)

  res.json(group)
}

async function createGroup(req, res) {
  const { name, permissions } = req.body
  const group = await Group.create({ name, permissions })

  res.status(201).json(group)
}

async function updateGroup(req, res) {
  const id = req.params.groupId
  if (!id) throw CustomError(400, '"groupId" field is required')

  const { name, permissions } = req.body
  await Group.update({ id, name, permissions }, {  where: { id } })
  const group = await Group.findByPk(id)

  res.json(group)
}

async function deleteGroup(req, res) {
  const id = req.params.groupId
  if (!id) throw CustomError(400, '"groupId" field is required')
  await Group.destroy({ where: { id }, individualHooks: true })

  res.sendStatus(200)
}

async function addUsersToGroup(req, res) {
  let transaction

  try {
    const { groupId, userIds } = req.body
    const data = userIds.map(userId => ({ userId, groupId }))
    transaction = await sequelize.transaction()

    await UserGroup.bulkCreate(data, { transaction })
    transaction.commit()
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    transaction.rollback()

    throw CustomError(400, error.message)
  }
}

module.exports = {
  getAllGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
  addUsersToGroup
}
