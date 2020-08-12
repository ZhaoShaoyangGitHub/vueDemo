import Vue from "vue";

//自定义指令钩子函数共接收3个参数，包括 el (绑定指令的真实dom)、binding (指令相关信息)、vnode (节点的虚拟dom)。
Vue.directive("role", {
  inserted: function(el, binding, vnode) {
    let role = binding.value;
    if (role) {
      el.style.backgroundColor = role;
      const appList = vnode.context.$store.state.appList;
      if (!appList) return;
      // 是否有权限
      const hasPermission = role.some(item => appList.inCludes(item));
      if (!hasPermission) {
        el.remove();
      }
    }
  }
});
