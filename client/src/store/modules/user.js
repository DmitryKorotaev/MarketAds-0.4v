import axios from "axios";
import router from "./router";
export default new Vuex.Store({
  modules: {
    User: {
      namespaced: true,
      state() {
        return { isAuth: localStorage.getItem("auth") ? true : false };
      },
      //   getters: {},
      mutations: {
        changeAuth(state) {
          state.isAuth = !state.isAuth;
        },
      },
      actions: {
        async register({ commit }, { numberPhone, name, email, password }) {
          const res = await axios.post("/api/auth/register", {
            numberPhone,
            name,
            email,
            password,
          });
        },
      },
    },
  },
});
