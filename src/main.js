import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./cube-ui";
import interceptor from "./interceptor";
import { createAPI } from "cube-ui";
import create from '@/utils/create';
import CartAnim from "@/components/CartAnim";
// 注册全局组件
createAPI(Vue, CartAnim, ["transitionend"]);
Vue.prototype.$create = create;

Vue.config.productionTip = false;

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
interceptor(vm);
