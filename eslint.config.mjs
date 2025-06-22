import neostandard from 'neostandard'
import globals from 'globals'

export default [
  ...neostandard({
    // Add Node.js and Jest globals
    globals: {
      ...globals.node,
      ...globals.jest
    },

    // Ignore patterns (similar to previous .eslintignore)
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.serverless/**',
      '**/.webpack/**',
      '**/*.json',
      '**/*.yml',
      '**/*.env',
      '**/*.md',
      '**/*.sh',
      '**/schema.*.mjs' // Auto-generated schema files
    ]
  }),

  // Additional rules to match previous configuration and existing code style
  {
    rules: {
      // Disable semi-colon enforcement (matches previous config)
      semi: 'off',
      '@stylistic/semi': 'off',

      // Allow console statements
      'no-console': 'off',

      // Unused vars with underscore prefix ignored
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

      // NO space before function parentheses (matches existing code)
      'space-before-function-paren': 'off',
      '@stylistic/space-before-function-paren': 'off',

      // Allow trailing commas (matches existing code)
      'comma-dangle': 'off',
      '@stylistic/comma-dangle': 'off',

      // Line break style off (cross-platform compatibility)
      'line-break-style': 'off',
      'linebreak-style': 'off',

      // Import rules
      'no-use-before-define': 'off',
      'import/prefer-default-export': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/extensions': 'off'
    }
  }
]
