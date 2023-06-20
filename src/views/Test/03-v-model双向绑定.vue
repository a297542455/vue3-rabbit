<script setup lang="ts">
import { ref } from "vue";
import TestVModel from "./components/test-v-model.vue";
const count = ref(100);
</script>

<template>
  <!-- 
      v-model 语法糖主要由 2 部分组成：
        modelValue                    自定义属性
        onUpdate:modelValue           自定义事件
      ✨技巧：调试工具中审查 v-model 的组件即可看到传递的 props 和 emit 的名称。
  -->
  <TestVModel v-model="count" my-attr="自定义属性" />
</template>

<style scoped lang="less"></style>
