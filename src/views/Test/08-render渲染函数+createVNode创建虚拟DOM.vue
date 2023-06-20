<script lang="ts">
// 1. 没有使用 script setup
import { createVNode } from "vue";
export default {
  // 2. render 是 vue 单文件组件的渲染函数，render 和 setup 同级
  render() {
    // 2.1. createVNode 是创建虚拟 DOM 的函数，h 函数是 createVNode 的简写
    const vDOM = createVNode("h1", { id: "box" }, "hello");
    console.log("虚拟DOM", vDOM);
    // 2.2. return 的虚拟DOM最终会被渲染
    return vDOM;
  },
};
// 3. 没有书写 template 模板，template 优先级比 render 高
</script>
