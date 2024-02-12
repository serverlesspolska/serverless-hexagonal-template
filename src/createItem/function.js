import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import httpErrorHandler from '@middy/http-error-handler'
import validator from 'middy-ajv'
import { Logger } from '@aws-lambda-powertools/logger'

import { performCalculation } from './businessLogic.js'
import { MyEntityService } from '../common/services/MyEntityService.js'
import eventSchema from './schema.inputSchema.js'

const logger = new Logger()

const lambdaHandler = async (event) => {
  logger.info('Starting Lambda function')
  const result = performCalculation(event.body)
  const myEntityService = new MyEntityService()
  return myEntityService.create(result)
}

export const handler = middy()
  .use(jsonBodyParser())
  .use(validator({ eventSchema })) // TODO implement responseSchema as well (best practice)
  .use(httpErrorHandler({ logger: (...args) => logger.error(args) }))
  .handler(lambdaHandler)
