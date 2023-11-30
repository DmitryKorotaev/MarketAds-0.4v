import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    meta: { layout: "main" },
    component: () => import("@/views/Home.vue"),
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
    meta: { layout: "empty" },
    component: () => import("@/views/Login.vue"),
  },

  {
    path: "/Creating-ads",
    name: "Creating-ads",
    meta: { layout: "empty" },
    component: () => import("@/views/Creating-ads.vue"),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
