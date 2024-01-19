import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuelidate from "vuelidate";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";

Vue.config.productionTip = false;
Axios.defaults.baseURL = "http://localhost:4001";
Axios.defaults.headers = {
  "Content-Type": "application/json",
  "X-Authorization": localStorage.getItem(""),
};

app.config.globalProperties.$axios = Axios;

Vue.use(Vuelidate);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
