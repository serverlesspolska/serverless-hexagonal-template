const middy = require('@middy/core')
const validator = require('@middy/validator')
const { autoProxyResponse } = require('middy-autoproxyresponse')
const httpJsonBodyParser = require('@middy/http-json-body-parser')
const httpErrorHandler = require('@middy/http-error-handler')

// eslint-disable-next-line no-unused-vars
const handler = async (event, context) => {
  console.log('body', event.body);
  return event.body
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
