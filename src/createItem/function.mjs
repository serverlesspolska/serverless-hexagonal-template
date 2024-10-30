import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import httpErrorHandler from '@middy/http-error-handler'
import validator from 'middy-ajv'
import { Logger } from '@aws-lambda-powertools/logger'

import { performCalculation } from './businessLogic.mjs'
import { MyEntityService } from '../common/services/MyEntityService.mjs'
import eventSchema from './schema.eventSchema.mjs'
import responseSchema from './schema.responseSchema.mjs'

const logger = new Logger({ serviceName: import.meta.url.split('/').pop() });

const lambdaHandler = async (event) => {
  logger.info('Starting Lambda function')
  const result = performCalculation(event.body)
  const myEntityService = new MyEntityService()
  return (await myEntityService.create(result)).toDto()
}

export const handler = middy()
  .use(jsonBodyParser())
  .use(validator({ eventSchema, responseSchema }))
  .use(httpErrorHandler({ logger: (...args) => logger.error(args) }))
  .handler(lambdaHandler)
