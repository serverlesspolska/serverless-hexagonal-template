const businessLogic = require('../../src/createItem/businessLogic')

describe('Creat Item buiness logic suite', () => {
  it('should add numbers', () => {
    // GIVEN
    const a = 2
    const b = 5
    const method = 'add'

    // WHEN
    const actual = businessLogic.performCalculation(a, b, method)

    // THEN
    expect(actual).toBe(7)
  })

  it('should throw error on bad method', () => {
    // GIVEN
    const a = 2
    const b = 5
    const method = 'divide'

    // WHEN
    let error
    try {
      businessLogic.performCalculation({ a, b, method })
    } catch (e) {
      error = e
    }

    // THEN
    expect(error.message).toBe('Not implemented yet!')
    expect(error.status).toBe(400)
  })
})
