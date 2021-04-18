const DynamoDbAdapter = require('../adapters/DynamoDbAdapter')
const MyEntity = require('../entities/MyEntity')

module.exports = class MyEntityService {
  constructor(dynamoDbAdapter) {
    this.dynamoDbAdapter = dynamoDbAdapter || new DynamoDbAdapter()
  }

  async createMyEntity(result) {
    const myEntity = new MyEntity({ result })
    const params = {
      Item: myEntity.toItem(),
      // Key: pointer.key(),
      ReturnConsumedCapacity: 'TOTAL',
      TableName: process.env.tableName
    }
    try {
      await this.dynamoDbAdapter.create(params)
    } catch (error) {
      console.log('Error', error)
      throw error
    }
    return myEntity
  }

  async getItemById(id) {
    const response = await this.dynamoDbAdapter.queryByField('PK', id)
    const item = response.Items[0]
    return new MyEntity({ id: item.PK, result: item.result, createdAt: item.createdAt })
  }
}
