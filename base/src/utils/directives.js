import Vue from "vue";
import { getStyle } from "./common";

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

export const loadMore = {
  directives: {
    more: {
      bind: function(el, binding) {
        let dpr = window.document.documentElement.getAttribute("data-dpr");
        let wHeight = window.screen.height * dpr;
        let footerHeight = 0;
        let body, lastScrollTop, offsetTop, listHeight, marginBottom;
        const more = () => {
          if (
            wHeight + lastScrollTop >=
            offsetTop + listHeight + marginBottom + footerHeight
          ) {
            binding.value.loadingMore();
          }
        };
        const moveEnd = () => {
          if (requestAnimationFrame && cancelAnimationFrame) {
            let stop = requestAnimationFrame(() => {
              if (lastScrollTop !== body.scrollTop) {
                lastScrollTop = body.scrollTop;
                moveEnd();
              } else {
                cancelAnimationFrame(stop);
                more();
              }
            });
          } else {
            let stop = setTimeout(() => {
              if (lastScrollTop !== body.scrollTop) {
                lastScrollTop = body.scrollTop;
                moveEnd();
              } else {
                clearTimeout(stop);
                more();
              }
            }, 50);
          }
        };
        body = document.getElementsByTagName("body")[0];
        el.addEventListener(
          "touchstart",
          () => {
            offsetTop = el.offsetTop;
            listHeight = el.clientHeight;
            if (binding.value.foot) {
              footerHeight = window.document.getElementById("footer")
                .clientHeight;
            }
            marginBottom = getStyle(el, "marginBottom");
          },
          true
        );
        el.addEventListener(
          "touchend",
          () => {
            lastScrollTop = body.scrollTop;
            moveEnd();
          },
          true
        );
      }
    },
    loadRatings: {
      bind: function(el, binding) {
        let listHeight, listClientHeight, lastScrollTop, children, marginBottom;
        const more = () => {
          if (Math.ceil(listHeight + lastScrollTop) >= listClientHeight) {
            binding.value();
          }
        };
        const moveEnd = () => {
          if (requestAnimationFrame && cancelAnimationFrame) {
            let stop = requestAnimationFrame(() => {
              if (lastScrollTop !== el.scrollTop) {
                lastScrollTop = el.scrollTop;
                moveEnd();
              } else {
                cancelAnimationFrame(stop);
                more();
              }
            });
          } else {
            let stop = setTimeout(() => {
              if (lastScrollTop !== el.scrollTop) {
                lastScrollTop = el.scrollTop;
                moveEnd();
              } else {
                clearTimeout(stop);
                more();
              }
            }, 50);
          }
        };
        el.addEventListener(
          "touchstart",
          () => {
            listHeight = parseInt(el.style.height);
            children = el.getElementsByTagName("section");
            marginBottom =
              getStyle(children[0], "marginBottom") +
              getStyle(children[1], "marginBottom");
            listClientHeight =
              parseInt(children[0].clientHeight) +
              parseInt(children[1].clientHeight) +
              marginBottom;
          },
          true
        );
        el.addEventListener(
          "touchend",
          () => {
            lastScrollTop = el.scrollTop;
            moveEnd();
          },
          true
        );
      }
    }
  }
};
