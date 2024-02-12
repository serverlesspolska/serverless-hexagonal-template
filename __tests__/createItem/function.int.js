const baseURL = `https://${process.env.httpApiGatewayEndpointId}.execute-api.${process.env.region}.amazonaws.com`

describe('createItem function', () => {
  it('should respond with statusCode 200 to correct request', async () => {
    // GIVEN
    const payload = {
      a: 10,
      b: 5,
      method: 'add'
    }

    // WHEN
    const response = await fetch(`${baseURL}/item`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      }
    })

    // THEN
    expect(response.status).toBe(200)
  })

  it('should respond with Bad Request 400 to incorrect request', async () => {
    // GIVEN
    const wrongPayload = {}

    // WHEN
    const response = await fetch(`${baseURL}/item`, {
      method: 'POST',
      body: JSON.stringify(wrongPayload),
      headers: {
        "Content-Type": "application/json",
      }
    })

    // THEN
    expect(response.status).toBe(400)
  })

  it('should respond with Not implemented yet for other methods than add', async () => {
    // GIVEN
    const payload = {
      a: 10,
      b: 5,
      method: 'divide'
    }

    // WHEN
    const response = await fetch(`${baseURL}/item`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      }
    })
    const text = await response.text()

    // THEN
    expect(response.status).toBe(400)
    expect(text).toEqual('Not implemented yet!')
  })
})
