const IamTestHelper = require('serverless-iam-test-helper')

const MyEntityService = require('../../src/common/services/MyEntityService.mjs')

describe('ProcessItem Lambda IAM Role', () => {
  beforeAll(async () => {
    await IamTestHelper.assumeRoleByLambdaName('processItem')
  });

  it('should ALLOW dynamodb:GetItem', async () => {
    // GIVEN
    const service = new MyEntityService()

    // WHEN
    await service.getById('any id')

    // THEN
    // lack of exception means that GetItem action is allowed
    // TODO improve that test there is explicit assertion
  })

  it('should DENY dynamodb:PutItem', async () => {
    // GIVEN
    const result = 48
    const service = new MyEntityService()

    // WHEN
    let actual
    try {
      await service.create(result)
    } catch (exception) {
      actual = exception
    }

    // THEN
    expect(actual.code).toBe('AccessDeniedException')
    expect(actual.message.includes('is not authorized to perform: dynamodb:PutItem')).toBeTruthy()
  })

  it('should DENY dynamodb:Query', async () => {
    // GIVEN
    const result = 48
    const service = new MyEntityService()

    // WHEN
    let actual
    try {
      await service.getByResult(result)
    } catch (exception) {
      actual = exception
    }

    // THEN
    expect(actual.code).toBe('AccessDeniedException')
    expect(actual.message.includes('is not authorized to perform: dynamodb:Query')).toBeTruthy()
  })
})
