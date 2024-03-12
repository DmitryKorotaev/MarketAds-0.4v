import Vue from "vue";
import VueRouter from "vue-router";
import guest from "./middleware/guest";
import auth from "./middleware/auth";
// import pageAds from "@/views/pageAds.vue";

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
    meta: { layout: "main" },
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
    meta: {
      layout: "empty",
      middleware: [guest, auth],
    },
    component: () => import("@/views/Login.vue"),
  },

  {
    path: "/Creating-ads",
    name: "Creating-ads",
    meta: { layout: "empty", middleware: [auth] },
    component: () => import("@/views/Creating-ads.vue"),
  },
  {
    path: "/all/:id",
    name: "id",
    props: true,
    meta: { layout: "main", middleware: [auth] },
    component: () => import("@/views/AdsPage.vue"),
  },
  {
    path: "/MyAds",
    name: "MyAds",
    meta: { layout: "main", middleware: [auth] },
    component: () => import("@/views/MyAds.vue"),
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
