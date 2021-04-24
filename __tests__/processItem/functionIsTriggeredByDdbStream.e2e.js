const { default: axios } = require('axios')

axios.defaults.baseURL = `https://${process.env.httpApiGatewayEndpointId}.execute-api.${process.env.region}.amazonaws.com`

describe('processItem Lambda function', () => {
  it('should be invoked by DDB Stream after createItem Lambda saves element into DynamoDB', async () => {
    // GIVEN
    const payload = {
      a: 10,
      b: 5,
      method: 'add'
    }

    // WHEN
    const actual = await axios.post('/item', payload)

    // console.log(actual)

    // THEN
    expect(actual.status).toBe(200)

    // Using aws-testing-library lib that extends jest framework
    await expect({
      region: process.env.region,
      function: `${process.env.service}-${process.env.stage}-processItem`,
    }).toHaveLog(
      'Processing item' /* a message log in processItem Lambda function */,
    );
  })
})
