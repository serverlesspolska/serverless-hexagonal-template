import { MyEntityService } from '../../../src/common/services/MyEntityService.mjs'

describe('MyEntity service', () => {
  it('should create and save new entity', async () => {
    // GIVEN
    const result = 48
    const service = new MyEntityService()

    // WHEN
    const actual = await service.create(result)
    const itemStoredInDb = await service.getById(actual.id)

    // THEN
    expect(itemStoredInDb).toBeTruthy()
    expect(actual).toEqual(itemStoredInDb)
  })
})
