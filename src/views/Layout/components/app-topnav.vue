<script setup lang="ts">
import useStore from "@/store";
import { storeToRefs } from "pinia";

const { member } = useStore();
// storeToRefs 解构出来的数据还能保持响应式
const { profile } = storeToRefs(member);
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!-- 直接使用 member.profile.token 表是否登录，语义不强 -->
        <!-- 升级：通过 getters 封装 isLogin 获取登录状态 -->
        <template v-if="member.isLogin">
          <li>
            <RouterLink to="/member">
              <i class="iconfont icon-user"></i>
              {{ profile.nickname || profile.account || profile.mobile }}
            </RouterLink>
          </li>
          <li><a href="javascript:;" @click="member.logout()">退出登录</a></li>
        </template>
        <template v-else>
          <li><RouterLink to="/login">请先登录</RouterLink></li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
        <li><RouterLink to="/member/order">我的订单</RouterLink></li>
        <li><RouterLink to="/member">会员中心</RouterLink></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="less">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
