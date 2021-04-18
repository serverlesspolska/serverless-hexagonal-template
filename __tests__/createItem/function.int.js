const { default: axios } = require('axios')

axios.defaults.baseURL = `https://${process.env.httpApiGatewayEndpointId}.execute-api.${process.env.region}.amazonaws.com`

describe('createItem function', () => {
  it('should respond with statusCode 200 to correct request', async () => {
    // GIVEN
    const payload = {
      a: 10,
      b: 5,
      method: 'add'
    }

    // WHEN
    const actual = await axios.post('/item', payload)

    // THEN
    expect(actual.status).toBe(200)
  })

  it('should respond with Bad Request 400 to incorrect request', async () => {
    // GIVEN
    const wrongPayload = {}

    // WHEN
    let actual
    try {
      await axios.post('/item', wrongPayload)
    } catch (e) {
      actual = e.response
    }

    // THEN
    expect(actual.status).toBe(400)
    expect(actual.statusText).toBe('Bad Request')
  })
})
