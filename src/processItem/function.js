const handler = async (event, context) => {
  console.log('event', JSON.stringify(event))
  console.log('context', JSON.stringify(context))

  console.log('Process item')
  return true
}

module.exports.handler = handler
