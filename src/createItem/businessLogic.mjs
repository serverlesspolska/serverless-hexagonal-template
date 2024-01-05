import { Logger } from '@aws-lambda-powertools/logger'

const logger = new Logger()

export const performCalculation = ({ a, b, method }) => {
  logger.info('Received method with values', {
    method,
    values: {
      a,
      b,
    }
  })
  switch (method) {
    case 'add':
      return a + b
    // To Do - implement other methods (just sample, not a real to do)
    default:
      throw new NotImplementedYetError()
  }
}

class NotImplementedYetError extends Error {
  constructor() {
    super()
    this.status = 400
    this.statusCode = 400
    this.name = 'NotImplementedYetError'
    this.message = 'Not implemented yet!'
  }
}
