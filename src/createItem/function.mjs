import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import httpErrorHandler from '@middy/http-error-handler'
import validatorMiddleware from '@middy/validator'
import { Logger } from '@aws-lambda-powertools/logger'

import { performCalculation } from './businessLogic.mjs'
import { MyEntityService } from '../common/services/MyEntityService.mjs'
import inputSchema from './schema.inputSchema.mjs'

const logger = new Logger()

const lambdaHandler = async (event) => {
  logger.info('Starting Lambda function')
  const result = performCalculation(event.body)
  const myEntityService = new MyEntityService()
  return myEntityService.create(result)
}

export const handler = middy()
  .use(jsonBodyParser())
  .use(validatorMiddleware({
    eventSchema: inputSchema
  }))
  .use(httpErrorHandler({ logger: (...args) => logger.error(args) }))
  .handler(lambdaHandler)
