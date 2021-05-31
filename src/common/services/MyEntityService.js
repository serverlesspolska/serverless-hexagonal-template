const log = require('serverless-logger')(__filename)
const DynamoDbAdapter = require('../adapters/DynamoDbAdapter')
const MyEntity = require('../entities/MyEntity')

module.exports = class MyEntityService {
  constructor(dynamoDbAdapter) {
    this.dynamoDbAdapter = dynamoDbAdapter || new DynamoDbAdapter()
    this.tableName = process.env.tableName
  }

  async create(result) {
    log('Creating MyEntity item in repository')
    const myEntity = new MyEntity({ result })
    await this.dynamoDbAdapter.createItem(this.tableName, myEntity)
    return myEntity
  }

  async getById(id) {
    const paramsGet = {
      Key: {
        PK: { S: id }
      },
      ReturnConsumedCapacity: 'TOTAL',
      TableName: this.tableName
    }
    const response = await this.dynamoDbAdapter.get(paramsGet)
    const item = response.Item

    if (item) {
      return new MyEntity({ id: item.PK.S, result: item.result.N, createdAt: item.createdAt.S });
    }
    return item;
  }

  async getByResult(value) {
    const response = await this.dynamoDbAdapter.queryByField(this.tableName, 'result', value)
    // eslint-disable-next-line max-len
    return response.Items.map((item) => new MyEntity({ id: item.PK, result: item.result, createdAt: item.createdAt }))
  }
}
