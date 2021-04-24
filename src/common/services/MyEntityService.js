const DynamoDbAdapter = require('../adapters/DynamoDbAdapter')
const MyEntity = require('../entities/MyEntity')

module.exports = class MyEntityService {
  constructor(dynamoDbAdapter) {
    this.dynamoDbAdapter = dynamoDbAdapter || new DynamoDbAdapter()
  }

  async create(result) {
    const myEntity = new MyEntity({ result })
    await this.dynamoDbAdapter.createItem(process.env.tableName, myEntity)
    return myEntity
  }

  async getById(id) {
    const response = await this.dynamoDbAdapter.queryByField('PK', id)
    const item = response.Items[0]
    return new MyEntity({ id: item.PK, result: item.result, createdAt: item.createdAt })
  }
}
