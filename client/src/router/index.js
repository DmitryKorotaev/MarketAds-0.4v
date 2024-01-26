import Vue from "vue";
import VueRouter from "vue-router";
import guest from "./middleware/guest";
import auth from "./middleware/auth";

Vue.use(VueRouter);

["push", "replace"].forEach((method) => {
  const originalMethod = VueRouter.prototype[method];
  VueRouter.prototype[method] = function m(location) {
    return originalMethod.call(this, location).catch((error) => {
      if (error.name !== "NavigationDuplicated") {
        // capture exception
      }
    });
  };
});

const routes = [
  {
    path: "/",
    name: "all",
    meta: { layout: "main", middlewhare: [auth] },
    component: () => import("@/views/all.vue"),
  },

  {
    path: "/Register",
    name: "Register",
    meta: { layout: "empty" },
    component: () => import("@/views/Register.vue"),
  },

  {
    path: "/Login",
    name: "Login",
    meta: { layout: "empty", middlewhare: [guest] },
    component: () => import("@/views/Login.vue"),
  },

  {
    path: "/Creating-ads",
    name: "Creating-ads",
    meta: { layout: "empty", middlewhare: [auth] },
    component: () => import("@/views/Creating-ads.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  const middleware = to.meta.middleware;
  const context = { to, from, next };
  return middleware[0]({
    ...context,
  });
});

export default router;
