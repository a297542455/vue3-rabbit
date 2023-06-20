<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import TopAwaitCom from "./12-顶级await组件.vue";

// import TestAsyncCom from "./01-组件库测试.vue";
const TestAsyncCom = defineAsyncComponent(() => import("./01-组件库测试.vue"));
</script>

<template>
  <Suspense>
    <template #default>
      <TestAsyncCom />
    </template>
    <template #fallback>
      <h1>Loading...</h1>
    </template>
  </Suspense>
  <h1>---------------------------</h1>
  <Suspense>
    <TopAwaitCom />
    <template #fallback>
      <h1>Loading...</h1>
    </template>
  </Suspense>
</template>
