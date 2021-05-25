const { userConf } = require('./config/index')

const eslintConf = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'standard',
  settings: {
    'html/html-extensions': ['.html', '.mpx'],  // consider .html and .mpx files as HTML
  },
  plugins: [
    'html'
  ],
  globals: {
    wx: true,
    getApp: true,
    App: true,
    __mpx_mode__: true
  },
  rules: {
    camelcase: ['error', { 'allow': ['__mpx_mode__'] }],
    "no-unused-vars": 0,
    'no-debugger': 0,
    'no-multiple-empty-lines': 0,
    // 使用拖尾逗号
    'comma-dangle': [
      'error',
      {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'never'
      }
    ]
  }
}
if (userConf.tsSupport) {
  eslintConf.overrides = [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      extends: [
        'standard',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      plugins: ['@typescript-eslint'],
    },
  ]
}

module.exports = eslintConf
