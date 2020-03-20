const { CustomError, errorHandler } = require('../error')
const logger = require('../logger')
const { mockResponse } = require('../../utils/interceptor')

describe('CustomError', () => {
  const errorCode = 404
  const errorMessage = 'test error message'

  it('should create correct error object', () => {
    const errorObject = new CustomError(errorCode, errorMessage)

    expect(errorObject).toBeInstanceOf(Error)
    expect(errorObject.code).toBe(errorCode)
    expect(errorObject.message).toBe(errorMessage)
  })
})

describe('errorHandler', () => {
  const logSpy = jest.spyOn(logger, 'log').mockImplementation(() => {})
  let res
  let err

  beforeEach(() => {
    res = mockResponse()
    jest.clearAllMocks()
  })

  it('should handle thrown Error', () => {
    try {
      throw new Error('test error')
    } catch (error) {
      err = error
    }
    errorHandler(err, null, res)

    expect(logSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        level: 'error',
        message: err.message
      })
    )
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ code: 500, message: 'Unexpected error' })
  })

  it('should handle thrown CustomError', () => {
    const errorCode = 404
    const errorMessage = 'CustomError'

    try {
      throw new CustomError(errorCode, errorMessage)
    } catch (error) {
      err = error
    }
    errorHandler(err, null, res)

    expect(logSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        level: 'error',
        message: err.message
      })
    )
    expect(res.status).toHaveBeenCalledWith(errorCode)
    expect(res.json).toHaveBeenCalledWith({ code: 404, message: errorMessage })
  })
})
