<script lang="ts">
export default {
  name: "MyTabsPane",
};
</script>

<script setup lang="ts">
import { inject } from "vue";

interface Props {
  // tabs 顶部标签
  label?: string;
  // name 双向绑定和高亮使用的
  name?: string;
}
defineProps<Props>();

// 插槽组件也能通过 inject 跨层级获取数据
const activeNameValue = inject("activeNameValue");
</script>

<template>
  <div class="xtx-tabs-panel" v-show="activeNameValue === name">
    <slot></slot>
  </div>
</template>
