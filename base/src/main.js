import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as common from './utils/common';

Vue.config.productionTip = false;

Vue.prototype.hasClass = common.hasClass;
Vue.prototype.addClass = common.addClass;
Vue.prototype.removeClass = common.removeClass;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
