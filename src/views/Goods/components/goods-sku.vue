<script setup lang="ts">
import bwPowerSet from "@/components/XtxUI/Sku/power-set";
import type { GoodsDetail, Sku, Spec, Value } from "@/types";
export type SkuChange = {
  skuId: string;
  price: string;
  oldPrice: string;
  inventory: number;
};

interface Props {
  goods: GoodsDetail;
}
const props = defineProps<Props>();
console.log(props);

const emit = defineEmits<{
  (e: "change", value: SkuChange): void;
}>();

const btnObjClick = (btnObj: Value, spec: Spec) => {
  // console.log(btnObj, spec);
  // 如果当前为选中
  if (btnObj.selected) {
    // 取消选中
    btnObj.selected = false;
  } else {
    // 排除所有
    spec.values.forEach((item) => {
      item.selected = false;
    });
    // 选中自己
    btnObj.selected = true;
  }
  // 每次点击更新选中状态
  updateDisabledStatus(props.goods.specs, pathMap);

  // 🚨规格组件-数据通讯
  if (btnObj.disabled) return;
  // 获取选中状态
  const selectedArr = getSelectedSpec(props.goods.specs).filter((v) => v);
  // 选中满全部
  if (selectedArr.length === props.goods.specs.length) {
    // 根据选中组合去字典查找
    const getSkuPath = pathMap[selectedArr.join(",")];
    // console.log('📌', getSkuPath);
    // 如果查找不到直接退出
    if (!getSkuPath) return;
    // 查找到获取 SkuId
    const skuId = getSkuPath[0];
    // 获取 Sku 信息
    const sku = props.goods.skus.find((sku) => sku.id === skuId);
    // console.log('📌', sku);
    if (sku) {
      // 传递给父组件
      emit("change", {
        skuId: sku.id,
        price: sku.price,
        oldPrice: sku.oldPrice,
        inventory: sku.inventory,
      });
    }
  } else {
    // 有没选中的
    emit("change", {} as SkuChange);
  }
};

type PathMap = {
  [key: string]: string[];
};
type Skus = Sku[];
// 处理可走路径字典对象
// 根据skus数据得到路径字典对象
const getPathMap = (skus: Skus) => {
  // 0. 初始化可走路径字典对象为空对象
  const pathMap = {} as PathMap;
  // 1. 遍历 skus 集合
  skus.forEach((sku) => {
    // 2. 过滤出有库存有效的sku
    if (sku.inventory !== 0) {
      // console.log(111, item);
      // 3. 得到 specs 数组
      const specs = sku.specs.map((spec) => spec.valueName);
      // console.log(specs);
      // 4. 得到 specs 数组的子集(幂集算法)
      const powerSet = bwPowerSet(specs);
      // console.log(powerSet);
      // 5. 设置给路径字典对象
      powerSet.forEach((set) => {
        // 6. 处理成字符串方便查找
        const key = set.join(",");
        // 7. 如果还没有数组，创建一个空数组
        if (!pathMap[key]) {
          pathMap[key] = [];
        }
        // 8. 已经有key往数组追加 skuid
        pathMap[key].push(sku.id);
      });
    }
  });

  return pathMap;
};

// 获取可走路径字典对象
const pathMap = getPathMap(props.goods.skus);
console.log(`组合字典结果`, pathMap);

// 🚨 初始化时基于 走路径字典对象 更新按钮的禁用状态
// 🔔 更新按钮的禁用状态
// 🔔 更新禁用状态核心：获取当前用户选中的规格，再模拟用户下一次的规格选择，去字典中查询，查询不到设置为禁用状态
type Specs = Spec[];
// 控制按钮的禁用状态
const updateDisabledStatus = (specs: Specs, pathMap: PathMap) => {
  // 遍历每一种规格
  specs.forEach((spec, i) => {
    // 先拿到当前选择的项目
    const selectedValues = getSelectedSpec(specs);
    // 遍历每一个按钮
    spec.values.forEach((btnObj) => {
      // 如果按钮未被选择
      if (!btnObj.selected) {
        // 🚨模拟用户选择
        selectedValues[i] = btnObj.name;
        // 去掉 去掉 undefined 之后组合成查找字典的 key
        const key = selectedValues.filter((v) => v).join(",");
        // 判断组合后的情况，在字典中是否能找到
        if (pathMap[key]) {
          btnObj.disabled = false;
        } else {
          btnObj.disabled = true;
        }
      }
    });
  });
};

// ⌛ 组件初始化的时候更新禁用状态
updateDisabledStatus(props.goods.specs, pathMap);

// 获取选中的规格的值
// 原则：得到的结果要保证顺序 ["选中规格", undefined, undefined]
// 🚨 由于书写顺序问题，可以用 function 定义函数提升
function getSelectedSpec(specs: Specs) {
  // 注意类型定义
  const arr: (string | undefined)[] = [];
  specs.forEach((spec, i) => {
    // 根据spec中values中找是否有，selected为true的，把selected为true的那个按钮存储起来
    const btnObj = spec.values.find((item) => item.selected);
    if (btnObj) {
      arr[i] = btnObj.name;
    } else {
      arr[i] = undefined;
    }
  });
  return arr;
}
</script>

<template>
  <div class="goods-sku">
    <dl v-for="spec in goods.specs" :key="spec.name">
      <dt>{{ spec.name }}</dt>
      <dd>
        <template v-for="btnObj in spec.values" :key="btnObj.name">
          <!-- 图片情况 -->
          <img
            v-if="btnObj.picture"
            :class="{ selected: btnObj.selected, disabled: btnObj.disabled }"
            :src="btnObj.picture"
            :title="btnObj.name"
            :alt="btnObj.name"
            @click="btnObjClick(btnObj, spec)"
          />
          <!-- 文本情况 -->
          <span
            v-else
            :class="{ selected: btnObj.selected, disabled: btnObj.disabled }"
            @click="btnObjClick(btnObj, spec)"
          >
            {{ btnObj.name }}
          </span>
        </template>
      </dd>
    </dl>
  </div>
</template>

<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
