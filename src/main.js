import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuelidate from "vuelidate";
import Vuex from "vuex";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";


Vue.config.productionTip = false;


Vue.use(Vuelidate);


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
