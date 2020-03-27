const logHandler = require('../logHandler')
const logger = require('../logger')
const { mockRequest } = require('../../utils/interceptor')

describe('logHandler', () => {
  const logSpy = jest.spyOn(logger, 'log').mockImplementation(() => {})
  const next = jest.fn()
  const req = mockRequest()

  it('should correct logging', () => {
    req.method = 'method'
    req.url = 'url'
    req.query = 'query'
    req.param = 'param'
    req.body = 'body'
    req.headers = 'headers'

    logHandler(req, null, next)

    expect(logSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        level: 'info',
        method: req.method,
        url: req.url,
        query: req.query,
        param: req.param,
        body: req.body,
        headers: req.headers
      })
    )
  })
})
