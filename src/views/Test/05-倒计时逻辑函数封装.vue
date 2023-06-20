<script setup lang="ts">
import { useIntervalFn } from "@vueuse/core";
import { ref } from "vue";

// 原生 setInterval 问题
//   1. 组件卸载时并不会主动清理。
// 为什么要基于 setInterval 的封装 useIntervalFn ？
//   优点1. 组件卸载自动清理
//   优点2. 可以配置是否立刻执行
//   优点3. 启动和暂停定时器写法简单

// resume  启动
// pause   暂停
const countTime = ref(0);
const { pause, resume } = useIntervalFn(
  // 等于以前写 setInterval 的回调函数
  () => {
    // 倒计时减少
    countTime.value--;
    // 是否到 0
    if (countTime.value <= 0) {
      // 暂停定时器
      pause();
    }
  },
  // 等于以前写 setInterval 的时间间隔
  1000,
  // 额外封装的 immediate 是否立刻执行
  { immediate: false }
);

const start = () => {
  // 初始化倒计时时间
  countTime.value = 60;
  // 启动定时器
  resume();
};
</script>

<template>
  <div>
    {{ countTime }}
    <button @click="start">开始定时器</button>
    <button @click="pause">暂停定时器</button>
    <button @click="resume">继续定时器</button>
  </div>
</template>
