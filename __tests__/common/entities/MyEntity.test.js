const MyEntity = require('../../../src/common/entities/MyEntity')

describe('My Entity', () => {
  it('should be created from parameters', () => {
    // GIVEN
    const params = {
      result: 48
    }

    // WHEN
    const actual = new MyEntity(params)

    // THEN
    expect(actual.id).toBeTruthy()
    expect(actual.createdAt).toBeTruthy()
    expect(actual.result).toBe(48)
  })

  it('should be transformed to DynamoDB structure', () => {
    // GIVEN
    const params = {
      result: 48
    }

    // WHEN
    const item = new MyEntity(params)
    const actual = item.toItem()

    // THEN
    expect(actual.PK.S).toBeTruthy()
    expect(actual.createdAt.S).toBeTruthy()
    expect(actual.result.N).toBe('48')
  })
})
