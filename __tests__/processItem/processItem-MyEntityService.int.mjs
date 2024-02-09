import { IamTestHelper } from 'serverless-iam-test-helper';

import { MyEntityService } from '../../src/common/services/MyEntityService.mjs';

describe('ProcessItem Lambda IAM Role', () => {
  beforeAll(async () => {
    const { credentials } = await IamTestHelper.assumeRoleByLambdaName('processItem')
    process.env.AWS_ACCESS_KEY_ID = credentials.accessKeyId
    process.env.AWS_SECRET_ACCESS_KEY = credentials.secretAccessKey
    process.env.AWS_SESSION_TOKEN = credentials.sessionToken
  });

  afterAll(() => {
    delete process.env.AWS_ACCESS_KEY_ID
    delete process.env.AWS_SECRET_ACCESS_KEY
    delete process.env.AWS_SESSION_TOKEN
  })

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
    let exception
    try {
      await service.create(result)
    } catch (error) {
      exception = error
    }

    // THEN
    expect(exception.name).toBe('AccessDeniedException')
    expect(exception.message.includes('is not authorized to perform: dynamodb:PutItem')).toBeTruthy()
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
