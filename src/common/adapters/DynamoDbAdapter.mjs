import {
  TransactWriteItemsCommand, GetItemCommand, PutItemCommand, UpdateItemCommand,
  DeleteItemCommand, DynamoDBClient
} from '@aws-sdk/client-dynamodb';
import { QueryCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export class DynamoDbAdapter {
  constructor() {
    this.client = new DynamoDBClient({
      region: process.env.region
    });
    this.documentClient = DynamoDBDocumentClient.from(this.client);
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
    };
    return this.query(params);
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
    };
    return this.query(params);
  }

  async query(params) {
    return this.documentClient.send(new QueryCommand(params))
  }

  async get(params) {
    return this.client.send(new GetItemCommand(params));
  }

  async createItem(tableName, entity) {
    console.log(`Saving new item id="${entity.id}" into DynamoDB table ${tableName}`)
    const params = {
      Item: entity.toItem(),
      ReturnConsumedCapacity: 'TOTAL',
      TableName: tableName
    }
    try {
      await this.create(params)
      console.log('Item saved successfully')
      return entity
    } catch (error) {
      console.log('Error', error)
      throw error
    }
  }

  async create(params) {
    return this.client.send(new PutItemCommand(params))
  }

  async delete(params) {
    console.log(`Deleting item with PK = ${params.Key.PK.S} & SK = ${params.Key.SK ? params.Key.SK.S : 'not present'}`)
    return this.client.send(new DeleteItemCommand(params))
  }

  async update(params) {
    return this.client.send(new UpdateItemCommand(params))
  }

  async transactWrite(params) {
    const transactionCommand = new TransactWriteItemsCommand(params);
    return this.client.send(transactionCommand)
  }
}
