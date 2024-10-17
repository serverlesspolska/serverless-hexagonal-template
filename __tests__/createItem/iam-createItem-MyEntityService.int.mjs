import IamTestHelper from 'serverless-iam-test-helper';

import { MyEntityService } from '../../src/common/services/MyEntityService.mjs'
import { DynamoDbAdapter } from '../../src/common/adapters/DynamoDbAdapter.mjs';

const cleanup = []

describe('CreateItem Lambda IAM Role', () => {
  beforeAll(async () => {
    await IamTestHelper.assumeRoleByLambdaName('createItem')
  });

  // this a compensation method, that deletes from database all items created by the test
  // since createItem lambda IAM role does not have privileges to remove item from DynamoDB
  // IamTestHelper.leaveLambdaRole() is executed to switch back to user's (your) IAM privileges
  afterAll(async () => {
    IamTestHelper.leaveLambdaRole()

    const userRoleAdapter = new DynamoDbAdapter()
    const deleteAll = cleanup.map((obj) => userRoleAdapter.delete({
      Key: obj.key(),
      TableName: process.env.tableName
    }))
    await Promise.all(deleteAll)
  });

  it('should ALLOW dynamodb:PutItem', async () => {
    // GIVEN
    const result = 48
    const service = new MyEntityService()

    // WHEN
    const actual = await service.create(result)

    // THEN
    expect(actual).toBeTruthy()
    expect(actual.result).toBe(result)
    expect(actual.id.length).toBeGreaterThan(10)

    // expect actual.createdAt to be less than 1 minute old
    const now = new Date()
    const createdAt = new Date(actual.createdAt)
    expect(now.getTime() - createdAt.getTime()).toBeLessThan(60 * 1000)

    // CLEANUP
    cleanup.push(actual) // afterAll method above
  })

  it('should DENY dynamodb:GetItem', async () => {
    // GIVEN
    const service = new MyEntityService()

    // WHEN
    let exception
    try {
      await service.getById('any id')
    } catch (error) {
      exception = error
    }

    // THEN
    expect(exception.name).toBe('AccessDeniedException')
    expect(exception.message.includes('is not authorized to perform: dynamodb:GetItem')).toBeTruthy()
  })

  it('should DENY dynamodb:Query', async () => {
    // GIVEN
    const result = 48
    const service = new MyEntityService()

    // WHEN
    let exception
    try {
      await service.getByResult(result)
    } catch (error) {
      exception = error
    }

    // THEN
    expect(exception.name).toBe('AccessDeniedException')
    expect(exception.message.includes('is not authorized to perform: dynamodb:Query')).toBeTruthy()
  })
})
