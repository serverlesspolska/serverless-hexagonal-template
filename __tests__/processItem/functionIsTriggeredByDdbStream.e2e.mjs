const baseURL = `https://${process.env.httpApiGatewayEndpointId}.execute-api.${process.env.region}.amazonaws.com`

describe('processItem Lambda function', () => {
  it('should be invoked by DDB Stream after createItem Lambda saves element into DynamoDB', async () => {
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
        'Content-Type': 'application/json',
      }
    })
    const actual = await response.json()
    const newItemDbId = actual.id

    // THEN
    expect(response.status).toBe(200)

    // Using aws-testing-library lib that extends jest framework
    await expect({
      region: process.env.region,
      function: `${process.env.service}-${process.env.stage}-processItem`,
      timeout: 25 * 1000
    }).toHaveLog(
      /*
        A log message in the processItem Lambda function containing the ID
        of the newly created item confirms that the function was successfully
        invoked and that the DynamoDB Stream integration is correctly configured.
      */
      `Processing item ${newItemDbId}`
    );
  })
})
