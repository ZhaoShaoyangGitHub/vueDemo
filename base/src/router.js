import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

const routeOptions = [
  {
    path: "/",
    name: "home"
  },
  {
    path: "/about",
    name: "about"
  },
  {
    path: "/404",
    name: "404"
  }
];

const routes = routeOptions.map(route => {
  if (!route.component) {
    route = {
      ...route
    };
  }
});

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/404", component: () => import("@/views/404") },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    { path: "*", redirect: "/404" }
  ]
});
