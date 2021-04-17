const responses = require('../../src/sampleTwo/responses')

describe('Responses tests', () => {
  it('should return 200 response code on success', () => {
    // GIVEN
    const payload = {
      test: 'value'
    }

    // WHEN
    const actual = responses.success(payload)

    // THEN
    expect(actual.statusCode).toBe(200)
    expect(actual.body).toBe(JSON.stringify(payload))
  })
})
