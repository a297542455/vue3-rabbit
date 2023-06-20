<script setup lang="ts">
// 直接导入源文件，导入多个组件，就需要写多个 import
import Skeleton from "@/components/XtxUI/Skeleton/Skeleton.vue";
// 从组件库的 index.ts 中按需导入，导入多个组件时，可以公用同一句 import
// 问题解答2：在 script 中，可以自动导入 TS/JS 导出过的内容
// import { XtxSkeleton } from "@/components/XtxUI";
// 👍 有了全局组件类型声明文件后，可以不需要再主动导入全局组件了
// import { XtxSkeleton, XtxButton } from "@/components/XtxUI";
</script>

<template>
  <!-- 问题解答1：在模板中可以自动导入 .vue 后缀名的源文件 -->
  <Skeleton />
  <Skeleton :height="30" :width="100" bg="pink" />
  <!-- 本质上还是 Skeleton 组件 -->
  <XtxSkeleton :height="50" :width="200" bg="#000" />
  <!-- 全局注册组件后，能按全局注册的组件名使用，但是没有TS类型检查 -->
  <XtxButton type="primary" size="large">按钮</XtxButton>
  <XtxButton type="plain">按钮2</XtxButton>
</template>
