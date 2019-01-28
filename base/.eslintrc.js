module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "key-spacing": [1, {  // 对象字面量中冒号的前后空格
      "beforeColon": false,
      "afterColon": true
    }],
    'indent': 'off', //新加了这句缩进为0
    'vue/script-indent': [ //新加了这句脚本缩进2空格
      '0',
      4,
      {
        'baseIndent': 1
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
