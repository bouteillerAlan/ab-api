module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*spec.ts'] },
    ],
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'padded-blocks': 'off',
    'indent': ['error', 2],
    'object-curly-spacing': ['error', 'always'],
    'space-in-parens': ['error', 'never'],
    'no-console': 'error'
  },
};
