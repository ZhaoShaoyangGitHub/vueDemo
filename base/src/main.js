import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as common from "./utils/common";
import "@/icons";
import MetaInfo from "vue-meta-info"; //引入vue-meta-info
Vue.use(MetaInfo);

Vue.config.productionTip = false;

Vue.prototype.hasClass = common.hasClass;
Vue.prototype.addClass = common.addClass;
Vue.prototype.removeClass = common.removeClass;

new Vue({
  router,
  store,
  render: (h) => h(App),
  mounted() {
    // document.dispatchEvent(new Event("render-event"));
    document.dispatchEvent(new Event("custom-render-trigger")); // 预渲染
  },
}).$mount("#app");
