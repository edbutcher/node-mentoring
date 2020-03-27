const loginController = require('../login')
const { mockRequest, mockResponse } = require('../../utils/interceptor')
const jwt = require('jsonwebtoken')

jest.mock('../../models', () => {
  const SequelizeMock = require('sequelize-mock')
  const dbMock = new SequelizeMock()
  const mockUser = dbMock.define('user',  {
    id: 123,
    login: 'TestLogin123',
    password: 'TestPassword123',
    age: 50,
    isDeleted: false
  },
  {
    instanceMethods: {
      validPassword: (password) => password === 'TestPassword123'
    }
  })

  return { User: mockUser }
})

describe('login controller', () => {
  let req
  let res

  beforeEach(() => {
    req = mockRequest()
    res = mockResponse()
    jest.clearAllMocks()
  })

  it('should correct send a token', async () => {
    const jwtSpy = jest.spyOn(jwt, 'sign').mockImplementation(() => 'token')
    req.body = {
      login: 'TestLogin123',
      password: 'TestPassword123'
    }
    await loginController(req, res)

    expect(jwtSpy).toHaveBeenCalledWith({ sub: 123 }, process.env.APP_SECRET_KEY, { expiresIn: 2000 })
    expect(res.send).toHaveBeenCalledWith('token')
  })

  it('should throw error on invalid password', async () => {
    req.body = {
      login: 'TestLogin123',
      password: 'invalid password'
    }

    await expect(loginController(req, res))
      .rejects
      .toThrowError('Bad username/password combination.')
  })
})
