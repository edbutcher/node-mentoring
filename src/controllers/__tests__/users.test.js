// const { CustomError } = require('../services/error')
// const { User, UserGroup, sequelize, Sequelize } = require('../models')
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser
} = require('../../controllers/users')
const { mockRequest, mockResponse } = require('../../utils/interceptor')

jest.mock('../../models', () => {
  const SequelizeMock = require('sequelize-mock')
  const dbMock = new SequelizeMock()

  const UserMock = dbMock.define('user',  {
    id: 123,
    login: 'TestLogin123',
    password: 'TestPassword123',
    age: 50,
    isDeleted: false
  },
  {
    instanceMethods: {
      validPassword: () => true
    }
  })
  // eslint-disable-next-line no-unused-vars
  UserMock.$queryInterface.$useHandler((query, queryOptions, done) => {
    if (query === 'findByPk') {
      if (queryOptions[0].where.id === 123) {
        return Promise.resolve('test')
      }
    }
    return
  })

  return {
    User: UserMock,
    sequelize: dbMock,
    Sequelize: SequelizeMock
  }
})

describe('user controllers', () => {
  let req
  let res

  beforeEach(() => {
    req = mockRequest()
    res = mockResponse()
    jest.clearAllMocks()
  })

  it('should send all users', async () => {
    req.query = {
      loginSubstring: 'TestLogin123',
      limit: 10
    }
    await getAllUsers(req, res)

    expect(res.json).toHaveBeenCalled()
  })

  // https://github.com/BlinkUX/sequelize-mock/issues/71
  xit('should send user by id', async () => {
    req.params = { userId: 123 }
    await getUserById(req, res)

    expect(res.json).toHaveBeenCalled()
  })

  // https://github.com/BlinkUX/sequelize-mock/issues/71
  xit('should ', async () => {
    req.params = { userId: 123 }
    req.body = {
      login: 'newTestLogin123',
      password: 'newTestPassword123',
      age: 18
    }
    await updateUser(req, res)

    expect(res.json).toHaveBeenCalled()
  })


  it('should create user', async () => {
    req.body = {
      login: 'TestLogin123',
      password: 'TestPassword123',
      age: 50
    }
    await createUser(req, res)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        login: 'TestLogin123',
        password: 'TestPassword123',
        age: 50
      })
    )
  })
})
