/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  // 定义全局变量
  globals: {
    // QC 是QQ授权登录引入 js 文件提供的
    QC: true,
  },
  // 规则
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/no-setup-props-destructure": "off",
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
  env: {
    "vue/setup-compiler-macros": true,
  },
};
