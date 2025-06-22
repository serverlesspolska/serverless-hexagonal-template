import IamTestHelper from 'serverless-iam-test-helper';
import { MyEntityService } from '../../src/common/services/MyEntityService.mjs'
import { DynamoDbAdapter } from '../../src/common/adapters/DynamoDbAdapter.mjs';

const cleanup = []

IamTestHelper.describeWithRole('CreateItem Lambda IAM Role', 'createItem', () => {
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
    cleanup.push(actual) // will be automatically cleaned up
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
}, {
  // Optional cleanup function - automatically called after credentials are restored
  cleanup: async () => {
    if (cleanup.length > 0) {
      console.log(`(Doing cleanup after test. Removing ${cleanup.length} items from DynamoDB) `)
      const userRoleAdapter = new DynamoDbAdapter()
      const deleteAll = cleanup.map((obj) => userRoleAdapter.delete({
        Key: obj.key(),
        TableName: process.env.tableName
      }))
      await Promise.all(deleteAll)
      cleanup.length = 0 // Clear the cleanup array
    }
  }
})
