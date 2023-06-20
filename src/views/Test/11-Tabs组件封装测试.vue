<script setup lang="ts">
import { orderStatus } from "@/constants";
import { ref } from "vue";
import Tabs from "./components/Tabs/index.vue";
import TabPane from "./components/Tabs/pane.vue";

const activeName = ref("all");
const tabClick = (index: number) => {
  console.log("当前点击的下标为", index);
};
</script>

<template>
  <h1>{{ activeName }}</h1>
  <!-- 直接使用组件 -->
  <Tabs v-model="activeName" @tab-click="({ index }) => tabClick(index)">
    <TabPane name="all" label="全部">
      <h1>全部的内容</h1>
    </TabPane>
    <TabPane name="unpay" label="待付款">
      <h1>待付款内容</h1>
    </TabPane>
  </Tabs>
  <hr />
  <hr />
  <hr />
  <hr />
  <!-- 📌 TabPane 通过 v-for 生成 -->
  <Tabs v-model="activeName" @tab-click="({ index }) => tabClick(index)">
    <TabPane
      v-for="item in orderStatus"
      :key="item.name"
      :name="item.name"
      :label="item.label"
    >
      <h1>{{ item.label }}的内容</h1>
    </TabPane>
  </Tabs>
</template>
