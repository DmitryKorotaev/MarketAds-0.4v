import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuelidate from "vuelidate";
import store from "./store";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

Vue.config.productionTip = false;
axios.defaults.baseURL = "http://localhost:4001";
axios.defaults.headers = {
  "Content-Type": "application/json",
  "X-Authorization": localStorage.getItem("login"),
};

Vue.prototype.$axios = axios;

Vue.use(Vuelidate);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
