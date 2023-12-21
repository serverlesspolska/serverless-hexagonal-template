import IamTestHelper from 'serverless-iam-test-helper'
import { MyEntityService } from '../../src/common/services/MyEntityService.mjs'

describe('CreateItem Lambda IAM Role', () => {
  beforeAll(async () => {
    await IamTestHelper.assumeRoleByLambdaName('createItem')
  });

  it('should ALLOW dynamodb:GetItem', async () => {
    // GIVEN
    const result = 48
    const service = new MyEntityService()

    // WHEN
    const actual = await service.create(result)

    // THEN
    expect(actual).toBeTruthy()
    // lack of exception means that GetItem action is allowed
    // TODO improve that test there is explicit assertion
  })

  it('should DENY dynamodb:GetItem', async () => {
    // GIVEN
    const service = new MyEntityService()

    // WHEN
    let actual
    try {
      await service.getById('any id')
    } catch (exception) {
      actual = exception
    }

    // THEN
    expect(actual.code).toBe('AccessDeniedException')
    expect(actual.message.includes('is not authorized to perform: dynamodb:GetItem')).toBeTruthy()
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
