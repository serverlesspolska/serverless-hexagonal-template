const helper = require('./helper')

// eslint-disable-next-line no-unused-vars
const handler = async (event, context) => {
  const response = { message: helper('World') };
  return response
}

module.exports.handler = handler
