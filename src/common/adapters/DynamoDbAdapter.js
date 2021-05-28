const AWS = require('aws-sdk')
const log = require('serverless-logger')(__filename)

module.exports = class DynamoDbAdapter {
  constructor() {
    this.documentClient = new AWS.DynamoDB.DocumentClient({
      region: process.env.region
    })
    this.client = new AWS.DynamoDB({
      region: process.env.region
    })
  }

  async queryByField(TableName, field, value) {
    const params = {
      TableName,
      // IndexName: indexName,
      KeyConditionExpression: '#field = :value',
      ExpressionAttributeNames: {
        '#field': field
      },
      ExpressionAttributeValues: {
        ':value': value
      }
    }
    return this.documentClient.query(params).promise()
  }

  async queryIndexByField(IndexName, field, value) {
    const params = {
      IndexName,
      KeyConditionExpression: '#field = :value',
      ExpressionAttributeNames: {
        '#field': field
      },
      ExpressionAttributeValues: {
        ':value': value
      }
    }
    return this.documentClient.query(params).promise()
  }

  async query(params) {
    return this.document.query(params).promise()
  }

  async get(params) {
    return this.client.getItem(params).promise()
  }

  async createItem(tableName, entity) {
    log(`Saving new item id="${entity.id}" into DynamoDB table ${tableName}`)
    const params = {
      Item: entity.toItem(),
      ReturnConsumedCapacity: 'TOTAL',
      TableName: tableName
    }
    try {
      await this.create(params)
      log('Item saved successfully')
      return entity
    } catch (error) {
      log('Error', error)
      throw error
    }
  }

  async create(params) {
    return this.client.putItem(params).promise()
  }

  async delete(params) {
    log(`Deleting item with PK = ${params.Key.PK.S} & SK = ${params.Key.SK ? params.Key.SK.S : 'not present'}`)
    return this.client.deleteItem(params).promise()
  }

  async update(params) {
    return this.client.updateItem(params).promise()
  }

  async transactWrite(params) {
    return executeTransactWrite({ client: this.client, params })
  }
}

// Thanks Alex DeBrie and his DynamoDB Book for this code below
// Alex: Thanks, Paul Swail! https://github.com/aws/aws-sdk-js/issues/2464#issuecomment-503524701
const executeTransactWrite = async ({ client, params }) => {
  const transactionRequest = client.transactWriteItems(params);
  let cancellationReasons;
  transactionRequest.on('extractError', (response) => {
    try {
      cancellationReasons = JSON.parse(response.httpResponse.body.toString()).CancellationReasons;
    } catch (err) {
      // suppress this just in case some types of errors aren't JSON parseable
      log('Error extracting cancellation error', err);
    }
  });
  return new Promise((resolve, reject) => {
    transactionRequest.send((err, response) => {
      if (err) {
        err.cancellationReasons = cancellationReasons
        return reject(err);
      }
      return resolve(response);
    });
  });
}
