const middy = require('@middy/core')
const { autoProxyResponse } = require('middy-autoproxyresponse')

// eslint-disable-next-line no-unused-vars
const handler = async (event, context) => {
  console.log('test');
  return true
}

module.exports.handler = middy(handler)
  .use(autoProxyResponse())
