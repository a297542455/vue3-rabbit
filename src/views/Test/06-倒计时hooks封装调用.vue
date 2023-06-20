<script setup lang="ts">
// 调用封装好的 hooks 函数
import { useCountDown } from "@/hooks";

const { countTime, start, pause, resume } = useCountDown(5);
</script>

<template>
  <div>
    {{ countTime }}
    <button @click="start()">开始定时器</button>
    <button @click="pause">暂停定时器</button>
    <button @click="resume">继续定时器</button>
  </div>
</template>
