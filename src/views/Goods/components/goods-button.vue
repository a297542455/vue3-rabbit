<script setup lang="ts">
// 步骤：
// 1. 准备静态结构
// 2. 分析按钮组件的自定义属性
// 3. `defineProps` 定义 Props 接收值
// 4. 使用父组件传过来的值
// interface Props {
//   // 按钮大小
//   size?: "mini" | "small" | "middle" | "large";
//   // 按钮颜色
//   type?: "gray" | "plain" | "primary" | "default";
// }
// defineProps<Props>();

// 设置 Props 默认值
// PropType 类型定义写法同样适用于选项式 API
import type { PropType } from "vue";

defineProps({
  size: {
    type: String as PropType<"mini" | "small" | "middle" | "large">,
    default: "small",
  },
  type: {
    type: String as PropType<"gray" | "plain" | "primary" | "default">,
    default: "gray",
  },
});

// 实验性解决方案 vue3.2.25+，不建议在生产环境中直接使用~
// interface Props {
//   // 按钮大小
//   size?: "mini" | "small" | "middle" | "large";
//   // 按钮颜色
//   type?: "gray" | "plain" | "primary" | "default";
// }
// 解构 props 响应性语法糖的写法，目前需要显式地选择开启
// const { size = "small", type = "plain" } = defineProps<Props>();
</script>

<template>
  <button class="xtx-button ellipsis" :class="`${size} ${type}`">
    <slot></slot>
  </button>
</template>

<style scoped lang="less">
// 基于类名定义一些和定制样式无关的样式
.xtx-button {
  appearance: none;
  border: none;
  outline: none;
  background: #fff;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
}
// ---------大小类名-------------
// 大
.large {
  width: 240px;
  height: 50px;
  font-size: 16px;
}
// 中
.middle {
  width: 180px;
  height: 50px;
  font-size: 16px;
}
// 小
.small {
  width: 100px;
  height: 32px;
}
//超小
.mini {
  width: 60px;
  height: 32px;
}

// ---------颜色类名----------
// 默认色
.default {
  border-color: #e4e4e4;
  color: #666;
}
// 确认
.primary {
  border-color: @xtxColor;
  background: @xtxColor;
  color: #fff;
}
// 普通
.plain {
  border-color: @xtxColor;
  color: @xtxColor;
  background: lighten(@xtxColor, 50%);
}
// 灰色
.gray {
  border-color: #ccc;
  background: #ccc;
  color: #fff;
}
</style>
