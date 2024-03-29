module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        ArrayExpression: 1,
        ObjectExpression: 1
      }
    ], //缩进风格
    'no-multiple-empty-lines': [
      2,
      {
        max: 1
      }
    ], // 禁止出现多行空行
    quotes: ['error', 'single'], // 要求尽可能地使用单引号
    semi: ['error', 'never'],// 禁止在语句末尾使用分号 (除了消除以 [、(、/、+ 或 - 开始的语句的歧义)
    'spaced-comment': ['error', 'always'], // // 或 /* 必须跟随至少一个空白
    'switch-colon-spacing': [
      'error',
      {
        before: false
      }
    ], // 强制在 switch 的冒号之前有空格
    'no-duplicate-imports': 'error', // 禁止重复导入
    'no-const-assign': 'error', // 不允许改变用const声明的变量
    'no-useless-computed-key': 'error', // 禁止在对象中使用不必要的计算属性
    'vue/no-async-in-computed-properties': 'error', // 计算属性禁止包含异步方法
    'vue/no-confusing-v-for-v-if': 'off', // 禁止出现难以理解的 v-if 和 v-for
    'vue/no-use-v-if-with-v-for': 'off',
    'vue/no-duplicate-attributes': 'error', // 禁止出现重复的属性
    'vue/require-prop-types': 'error', // prop 必须有类型限制
    'vue/require-valid-default-prop': 'error', // prop 的默认值必须匹配它的类型
    'vue/require-v-for-key': 'error', // v-for 指令的元素必须有 v-bind:key
    'vue/valid-v-model': 'off', // 允许v-model绑定动态的属性
    'no-invalid-regexp': 0 //禁止无效的正则表达式
  }
}
