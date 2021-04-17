const responseHeaders = {
  'Content-Type': 'application/json',
  // Required for CORS support to work
  'Access-Control-Allow-Origin': '*',
  // Required for cookies, authorization headers with HTTPS
  'Access-Control-Allow-Credentials': true
}

module.exports = {
  success: (data = {}, code = 200) => ({
    statusCode: code,
    headers: responseHeaders,
    body: JSON.stringify(data)
  }),
  error: (error) => ({
    statusCode: error.code,
    headers: responseHeaders,
    body: JSON.stringify(error)
  })
}
