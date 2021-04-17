const responses = require('./responses')

const handler = async (event, context) => {
  console.log('event', JSON.stringify(event))
  console.log('context', JSON.stringify(context))

  const { message } = process.env
  const payload = {
    message
  }
  return responses.success(payload)
}

module.exports.handler = handler
