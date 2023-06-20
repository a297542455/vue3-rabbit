<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";
import { ref } from "vue";

// 准备个 ref 用于绑定模板中的某个 DOM 节点或组件(目标元素)
const target = ref(null);
const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
  console.log("是否进入可视区域", isIntersecting);
  if (isIntersecting) {
    console.log("可以发送请求了");
    // 停止检查了
    stop();
  }
});
/*
  1.stop 一个可执行的函数用来停止监听行为
  2.target 一个由ref api调用之后形成的RefImpl对象 也可以是一个dom对象
  3.isIntersecting 一个类型为布尔值的数据 当被监听元素进入视口区域时为true,离开视口区域时为false
  🚨特别注意: 对于目标target是否进入视口区域的监听会一直进行不会只监听一次
*/
</script>

<template>
  <div class="container">
    <div class="box01">测试盒子01</div>
    <!-- 🚨 添加 ref="target" 和 模板关联 -->
    <div ref="target" class="box02">测试盒子02</div>
  </div>
</template>

<style scoped lang="less">
.box01 {
  height: 1000px;
  background-color: pink;
}
.box02 {
  height: 500px;
  background-color: tan;
}
</style>
