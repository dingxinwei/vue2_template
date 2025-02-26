module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'plugin:vue/essential',
    'plugin:prettier/recommended' // 新增这一行（必须在最后）
  ],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['prettier'], // 新增插件声明
  rules: {
    // 在这里添加自定义规则
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
   'prettier/prettier': 'error',
   'import/no-unresolved': 'off'
  },
};
