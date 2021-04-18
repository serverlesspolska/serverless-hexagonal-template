const MyEntityService = require('../../../src/common/services/MyEntityService')

describe('MyEntity service', () => {
  it('should create and save new entity', async () => {
    // GIVEN
    const result = 48
    const service = new MyEntityService()

    // WHEN
    const actual = await service.createMyEntity(result)
    const itemStoredInDb = await service.getItemById(actual.id)

    // THEN
    expect(itemStoredInDb).toBeTruthy()
    expect(actual).toEqual(itemStoredInDb)
  })
})
