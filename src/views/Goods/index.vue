<script setup lang="ts">
import { message } from "@/components/XtxUI";
import type { SkuEmit } from "@/components/XtxUI/Sku/index.vue";
import useStore from "@/store";
import type { CartItem, GoodsDetail } from "@/types";
import { http } from "@/utils/request";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

// 从路由中获取商品 id
const { params } = useRoute();
const id = params.id;
const goods = ref<GoodsDetail>();
// 组件挂载根据商品 id 获取商品详情数据
onMounted(async () => {
  const res = await http<GoodsDetail>("GET", "/goods", { id: id });
  console.log("/goods", res.data.result);
  goods.value = res.data.result;
});

const count = ref(1);
// 1. 最大值动态限制为库存量，库存量一变化，立刻更新max
// 2. 需要处理一下 inventory 库存会为 0的情况。/goods/1318002
const countMax = computed(() => {
  if (!goods.value) return 1;
  return goods.value.inventory > 0 ? goods.value?.inventory : 1;
});

// 获取 XtxSku 组件选中的商品信息
const skuId = ref("");
const attrsText = ref("");
const changeSku = (value: SkuEmit) => {
  // 🔔存储 skuId 用于加入购物车
  skuId.value = value.skuId || "";
  // 存储选中规格文本
  attrsText.value = value.specsText;
  // console.log("当前选择的SKU为信息为", value);
  if (goods.value && value.skuId) {
    // 根据选中规格，更新商品库存，销售价格，原始价格
    goods.value.inventory = value.inventory;
    goods.value.price = value.price;
    goods.value.oldPrice = value.oldPrice;
  }
};

const { cart } = useStore();
// 加入购物按钮点击
const addCart = () => {
  // 没有 skuId，提醒用户并退出函数
  if (!skuId.value) {
    return message({ type: "warn", text: "请选择完整商品规则~" });
  }
  if (!goods.value) return;
  // Partial   泛型工具类型 全部 转可选
  const cartItem: CartItem = {
    // 🚨🚨 注意数据收集字段名很多坑，小心操作
    // 第一部分：商品详情中有的
    id: goods.value.id, // 商品id
    name: goods.value.name, // 商品名称
    picture: goods.value.mainPictures[0], // 图片
    price: goods.value.oldPrice, // 旧价格
    nowPrice: goods.value.price, // 新价格
    stock: goods.value.inventory, // 库存
    // 第二部分：商品详情中没有的，自己通过响应式数据收集
    count: count.value, // 商品数量
    skuId: skuId.value, // skuId
    attrsText: attrsText.value, // 商品规格文本
    // 第三部分：设置默认值即可
    selected: true, // 默认商品选中
    isEffective: true, // 默认商品有效
  } as CartItem;
  console.log("😭 cartItem 数据终于准备完毕了", cartItem);
  // 调用加入购物车接口
  cart.addCart(cartItem);
};
</script>

<template>
  <div class="xtx-goods-page">
    <div class="container">
      <!-- 商品信息，🔔顶层写了 v-if 内部调用数据不用 ?. 访问数据了 -->
      <div class="goods-info" v-if="goods">
        <div class="media">
          <!-- 图片预览区 -->
          <div class="goods-image">
            <!-- 图片预览组件，要求传入 string[] 类型图片数组 -->
            <XtxImageView :image-list="goods.mainPictures" />
          </div>
          <!-- 统计数量 -->
          <ul class="goods-sales">
            <li>
              <p>销量人气</p>
              <p>100+</p>
              <p><i class="iconfont icon-task-filling"></i>销量人气</p>
            </li>
            <li>
              <p>商品评价</p>
              <p>200+</p>
              <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
            </li>
            <li>
              <p>收藏人气</p>
              <p>80+</p>
              <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
            </li>
            <li>
              <p>品牌信息</p>
              <p>90+</p>
              <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
            </li>
          </ul>
        </div>
        <!-- 商品信息区 -->
        <div class="spec">
          <!-- 商品主要信息 -->
          <div class="goods-main">
            <p class="g-name">{{ goods.name }}</p>
            <p class="g-desc">{{ goods.desc }}</p>
            <p class="g-price">
              <span>{{ goods.price }}</span>
              <span>{{ goods.oldPrice }}</span>
            </p>
            <div class="g-service">
              <dl>
                <dt>促销</dt>
                <dd>12月好物放送，App领券购买直降120元</dd>
              </dl>
              <dl>
                <dt>配送</dt>
                <dd>至</dd>
                <dd>
                  <XtxCity />
                </dd>
              </dl>
              <dl>
                <dt>服务</dt>
                <dd>
                  <span>无忧退货</span>
                  <span>快速退款</span>
                  <span>免费包邮</span>
                  <a href="javascript:;">了解详情</a>
                </dd>
              </dl>
            </div>
          </div>
          <!-- 规格选择组件 -->
          <XtxSku :goods="goods" @change="changeSku" />
          <!-- 数量选择组件 -->
          <XtxCount is-label v-model="count" :min="1" :max="countMax" />
          <!-- 按钮组件 -->
          <XtxButton
            @click="addCart"
            size="middle"
            type="primary"
            style="margin-top: 20px"
          >
            加入购物车
          </XtxButton>
        </div>
      </div>
      <!-- ⌛优化：商品信息数据未回来先显示 loading 加载 -->
      <div class="goods-info loading" v-else></div>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  margin-top: 20px;
}

// 商品信息
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}

.loading {
  background: #fff url("@/assets/images/loading.gif") no-repeat center;
}

// 图片预览区
.goods-image {
  width: 480px;
  height: 400px;
}

// 统计数量
.goods-sales {
  display: flex;
  width: 400px;
  align-items: center;
  text-align: center;
  height: 140px;
  li {
    flex: 1;
    position: relative;
    ~ li::after {
      position: absolute;
      top: 10px;
      left: 0;
      height: 60px;
      border-left: 1px solid #e4e4e4;
      content: "";
    }
    p {
      &:first-child {
        color: #999;
      }
      &:nth-child(2) {
        color: @priceColor;
        margin-top: 10px;
      }
      &:last-child {
        color: #666;
        margin-top: 10px;
        i {
          color: @xtxColor;
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
          cursor: pointer;
        }
      }
    }
  }
}

// 商品信息区
.spec {
  .g-name {
    font-size: 22px;
  }
  .g-desc {
    color: #999;
    margin-top: 10px;
  }
  .g-price {
    margin-top: 10px;
    span {
      &::before {
        content: "¥";
        font-size: 14px;
      }
      &:first-child {
        color: @priceColor;
        margin-right: 10px;
        font-size: 22px;
      }
      &:last-child {
        color: #999;
        text-decoration: line-through;
        font-size: 16px;
      }
    }
  }
  .g-service {
    background: #f5f5f5;
    width: 500px;
    padding: 20px 10px 0 10px;
    margin-top: 10px;
    dl {
      padding-bottom: 20px;
      display: flex;
      align-items: center;
      dt {
        width: 50px;
        color: #999;
      }
      dd {
        color: #666;
        &:last-child {
          span {
            margin-right: 10px;
            &::before {
              content: "•";
              color: @xtxColor;
              margin-right: 2px;
            }
          }
          a {
            color: @xtxColor;
          }
        }
      }
    }
  }
}

.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
