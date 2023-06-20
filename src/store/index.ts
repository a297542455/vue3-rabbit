// 合并 Pinia 模块
import useCartStore from "./modules/cart";
import useHomeStore from "./modules/home";
import useMemberStore from "./modules/member";

// 封装 useStore 合并管理所有模块
const useStore = () => {
  return {
    home: useHomeStore(),
    member: useMemberStore(),
    cart: useCartStore(),
  };
};

// 默认导出
export default useStore;
