<script setup lang="ts">
import { http } from "@/utils/request";

const res = await http("GET", "/home/banner");
console.log(res.data.result);
// 所有返回的数据相当于都被 Promise 包装过，调用时可以通过 <Suspense/>
</script>

<template>
  <h1>我是顶层 awiat 组件</h1>
</template>
