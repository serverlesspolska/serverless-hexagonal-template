const MyEntity = require('../../../src/common/entities/MyEntity.js')

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

  it('should be from DynamoDB item to object', () => {
    // GIVEN
    const params = {
      result: 48
    }
    const item = new MyEntity(params)
    const dbItem = item.toItem()

    // WHEN
    const actual = MyEntity.fromItem(dbItem)

    // THEN
    expect(actual.id).toBe(dbItem.PK.S)
    expect(actual.createdAt.toISOString()).toBe(dbItem.createdAt.S)
    expect(actual.result).toBe(params.result)
  })
})
