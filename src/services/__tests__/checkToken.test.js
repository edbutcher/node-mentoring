const checkToken = require('../checkToken')
const jwt = require('jsonwebtoken')
const { mockRequest } = require('../../utils/interceptor')

describe('checkToken', () => {
  const next = jest.fn()
  let req

  beforeEach(() => {
    req = mockRequest()
    jest.clearAllMocks()
  })

  it('should throw error when no token', () => {
    expect(() => {
      checkToken(req, null, next)
    }).toThrowError('Unauthorized.')
    expect(next).not.toHaveBeenCalled()
  })

  it('should throw error with invalid token', () => {
    req.headers['x-access-token'] = 'invalid'
    const mockJwtVerify = jest.spyOn(jwt, 'verify').mockImplementation(() => {
      throw new Error('Invalid token')
    })

    expect(() => {
      checkToken(req, null, next)
    }).toThrowError('Forbidden.')
    expect(mockJwtVerify).toHaveBeenCalledWith('invalid', process.env.APP_SECRET_KEY)
    expect(next).not.toHaveBeenCalled()
  })

  it('should call next with valid token', () => {
    req.headers['x-access-token'] = 'valid'
    const mockJwtVerify = jest.spyOn(jwt, 'verify').mockImplementation(() => true)
    checkToken(req, null, next)

    expect(mockJwtVerify).toHaveBeenCalledWith('valid', process.env.APP_SECRET_KEY)
    expect(next).toHaveBeenCalled()
  })
})
