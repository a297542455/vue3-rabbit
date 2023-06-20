<script setup lang="tsx" name="MyTabs">
import { provide, toRefs, useSlots, type Slots, type VNode } from "vue";

interface Props {
  modelValue: string;
}
// v-model 双向绑定语法糖子组件处理
const props = defineProps<Props>();
// ["update:modelValue", "tab-click"]
const emit = defineEmits<{
  (e: "update:modelValue", value: string): () => void;
  (e: "tab-click", value: { name: string; index: number }): () => void;
}>();
console.log("v-model双向绑定", props, emit);

// 在 TSX 中获取所有插槽
const slots: Slots = useSlots();
// console.log(slots);
// 获取默认插槽
const panes = slots.default?.();
console.log("📌默认插槽结果", panes);
// console.log("📌默认插槽type结果", panes?.[0].type);
const arr: VNode[] = [];

panes?.forEach((item: any) => {
  if (item.type?.name === "MyTabsPane") {
    arr.push(item);
  } else if (item.children instanceof Array) {
    // console.log("v-for生成的子元素", item.children);
    item.children.forEach((child: any) => {
      if (child.type?.name === "MyTabsPane") {
        arr.push(child);
      }
    });
  }
});

// 点击头部按钮事件
const tabClick = (name: string, index: number) => {
  // 更新双向绑定
  emit("update:modelValue", name);
  // tab-click 子传父的 name 和 index
  emit("tab-click", { name, index });
};

// 所有 TSX 结构都写到 Tabs 中，否则动态绑定数据会出问题
const Tabs = () => {
  // 🚨 默认插槽其实就是虚拟 DOM，根据虚拟 DOM 动态生成 Tabs 头部
  const navs = (
    <nav>
      {arr?.map((item, index) => (
        <a
          href="javascript:;"
          key={index}
          class={props.modelValue === item.props?.name ? "active" : ""}
          onClick={() => tabClick(item.props?.name, index)}
        >
          {item.props?.label}
        </a>
      ))}
    </nav>
  );
  // 应用了默认插槽
  return <div class="xtx-tabs">{[navs, panes]}</div>;
};

// 解构保持响应式
const { modelValue } = toRefs(props);
// 提供响应式数据，插槽组件使用
provide("activeNameValue", modelValue);
</script>

<template>
  <Tabs />
</template>
