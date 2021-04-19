const middy = require('@middy/core')
const validator = require('@middy/validator')
const { autoProxyResponse } = require('middy-autoproxyresponse')
const httpJsonBodyParser = require('@middy/http-json-body-parser')
const httpErrorHandler = require('@middy/http-error-handler')
const businessLogic = require('./businessLogic')
const MyEntityService = require('../common/services/MyEntityService')

const handler = async (event) => {
  const result = businessLogic.performCalculation(event.body)
  const myEntityService = new MyEntityService()
  await myEntityService.create(result)
  return result
}

const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      required: ['a', 'b', 'method'],
      properties: {
        a: { type: 'number' },
        b: { type: 'number' },
        method: { type: 'string' }
      }
    }
  }
}

module.exports.handler = middy(handler)
  .use(httpJsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler())
  .use(autoProxyResponse())
