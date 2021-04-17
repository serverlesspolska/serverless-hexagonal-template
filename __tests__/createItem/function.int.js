const { default: axios } = require('axios')

axios.defaults.baseURL = `https://${process.env.httpApiGatewayEndpointId}.execute-api.${process.env.region}.amazonaws.com`

describe('createItem function', () => {
  it('should respond with statusCode 200 to correct request', async () => {
    // GIVEN
    const payload = {}

    // WHEN
    const actual = await axios.post('/item', { data: payload })

    // THEN
    expect(actual.status).toBe(200)
  })
})
