const DynamoDbAdapter = require('../../../src/common/adapters/DynamoDbAdapter')

describe('DynamoDB Adapter', () => {
  it('should query by field', async () => {
    // GIVEN
    const db = new DynamoDbAdapter()

    // WHEN
    const results = await db.queryByField('PK', 'fake-fake-fake')

    // THEN
    expect(results).toBeTruthy()
    expect(results.Count).toBe(0)
  })

  it('should create & delete item', async () => {
    // GIVEN
    const db = new DynamoDbAdapter()
    const paramsCreate = {
      Item: {
        PK: { S: 'SampleId' },
        Type: { S: 'SampleId' },
      },
      ReturnConsumedCapacity: 'TOTAL',
      TableName: process.env.tableName
    }
    const paramsDelete = {
      Key: {
        PK: { S: 'SampleId' },
      },
      ReturnConsumedCapacity: 'TOTAL',
      TableName: process.env.tableName
    }

    // WHEN
    const createResults = await db.create(paramsCreate)
    const deleteResults = await db.delete(paramsDelete)
    const check = await db.queryByField('PK', 'SampleId')

    // THEN
    expect(createResults).toBeTruthy()
    expect(createResults.ConsumedCapacity.TableName).toMatch(process.env.tableName)
    expect(createResults.ConsumedCapacity.CapacityUnits).toBe(1)
    expect(deleteResults.ConsumedCapacity.TableName).toMatch(process.env.tableName)
    expect(deleteResults.ConsumedCapacity.CapacityUnits).toBe(1)
    expect(check.Count).toBe(0)
  })

  it('should get item', async () => {
    // GIVEN
    const db = new DynamoDbAdapter()
    const paramsCreate = {
      Item: {
        PK: { S: 'SampleId' },
        Type: { S: 'TestEntity' },
      },
      ReturnConsumedCapacity: 'TOTAL',
      TableName: process.env.tableName
    }
    const paramsDelete = {
      Key: {
        PK: { S: 'SampleId' }
      },
      ReturnConsumedCapacity: 'TOTAL',
      TableName: process.env.tableName
    }
    const paramsGet = {
      Key: {
        PK: { S: 'SampleId' }
      },
      ReturnConsumedCapacity: 'TOTAL',
      TableName: process.env.tableName
    }

    // WHEN
    const createResults = await db.create(paramsCreate)
    const getResults = await db.get(paramsGet)
    const deleteResults = await db.delete(paramsDelete)
    const check = await db.queryByField('PK', 'SampleId')

    // THEN
    expect(createResults).toBeTruthy()
    expect(createResults.ConsumedCapacity.TableName).toMatch(process.env.tableName)
    expect(createResults.ConsumedCapacity.CapacityUnits).toBe(1)
    expect(getResults.Item.PK.S).toBe('SampleId')
    expect(getResults.Item.Type.S).toBe('TestEntity')
    expect(deleteResults.ConsumedCapacity.TableName).toMatch(process.env.tableName)
    expect(deleteResults.ConsumedCapacity.CapacityUnits).toBe(1)
    expect(check.Count).toBe(0)
  })
})
