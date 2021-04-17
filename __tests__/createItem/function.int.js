const { default: axios } = require('axios')

describe('createItem function', () => {
  it('should respond with statusCode 200 to correct request', async () => {
    // GIVEN
    axios.defaults.baseURL = `https://${process.env.httpApiGatewayEndpointId}.execute-api.${process.env.region}.amazonaws.com`
    const payload = {}

    // WHEN
    const actual = await axios.post('/item', { data: payload })

    // THEN
    expect(actual.status).toBe(200)
  })
})
