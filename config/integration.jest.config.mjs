import * as dotenv from 'dotenv';

export default {
  testEnvironment: 'node',
  roots: ['../__tests__/'],
  testMatch: ['**/*.(int|integration).mjs'],
  testTimeout: 60000 * 2, // 2 minutes timeout
}

// Load environment variables generated by serverless-export-env plugin
dotenv.config({
  path: '.awsenv',
  bail: 1,
  testEnvironment: 'node'
})
