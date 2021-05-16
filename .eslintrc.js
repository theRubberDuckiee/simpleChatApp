module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    '@typescript-eslint',
  ],
  'rules': {
    'max-len': [2, { 'comments': 200, 'code': 150 }],
    'semi': [2, 'never'],
    'object-curly-spacing': ['error', 'always'],
    'no-array-constructor': 0,
    'require-jsdoc': 0,
    'sort-imports': ['error', {
      'ignoreCase': false,
      'ignoreDeclarationSort': false,
      'ignoreMemberSort': false,
      'allowSeparatedGroups': false,
    }],
  },
}
