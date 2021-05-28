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
    const response = await this.dynamoDbAdapter.queryByField(this.tableName, 'PK', id)
    const item = response.Items[0]
    return new MyEntity({ id: item.PK, result: item.result, createdAt: item.createdAt })
  }
}
