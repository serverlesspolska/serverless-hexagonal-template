import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import httpErrorHandler from '@middy/http-error-handler'
import validatorMiddleware from '@middy/validator'
import { transpileSchema } from '@middy/validator/transpile'
import { performCalculation } from './businessLogic.mjs'
import { MyEntityService } from '../common/services/MyEntityService.mjs'

const lambdaHandler = async (event) => {
  console.log('Starting Lambda function')
  const result = performCalculation(event.body)
  const myEntityService = new MyEntityService()
  return myEntityService.create(result)
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

export const handler = middy()
  .use(jsonBodyParser())
  .use(validatorMiddleware({
    eventSchema: transpileSchema(inputSchema)
  }))
  .use(httpErrorHandler())
  .handler(lambdaHandler)
