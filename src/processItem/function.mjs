import { Logger } from '@aws-lambda-powertools/logger'

const logger = new Logger({ serviceName: import.meta.url.split('/').pop() });

export const handler = async (event) => {
  const item = parseEvent(event)
  logger.info('Received item to process', { item })

  // this log message is used for testing
  // don't remove it. See: functionIsTriggeredByDdbStream.e2e.js
  logger.info(`Processing item ${item.dynamodb.Keys.PK.S}`)

  // here you can implement rest of your Lambda code

  return true
}

const parseEvent = (event) => event.Records[0]
