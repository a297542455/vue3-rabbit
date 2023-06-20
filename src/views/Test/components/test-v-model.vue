<script setup lang="ts">
// 🔔 v-model 双向绑定语法糖其实分为两步：
//   1. props 接收父组件传过来的值
//   2. emit  触发自定义事件修改值

interface Props {
  modelValue: number;
}

// 接收 v-model 语法糖的属性
const props = defineProps<Props>();
// 接收 v-model 语法糖的事件
const emit = defineEmits(["update:modelValue"]);

// 子组件的事件
const add = () => {
  // props 的值不能直接修改，累加后存到新值中
  const res = props.modelValue + 1;
  // 通过 emit 让父组件更新值
  emit("update:modelValue", res);
};
</script>

<template>
  <button>-</button>
  <input type="text" :value="modelValue" />
  <button @click="add">+</button>
</template>

<style scoped lang="less"></style>
