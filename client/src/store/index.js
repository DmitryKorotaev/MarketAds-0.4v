import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import ads from "./modules/ads";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    ads,
  },
});
