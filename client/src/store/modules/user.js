import router from "@/router";
import axios from "axios";

export default {
  namespaced: true,
  state() {
    return { isAuth: localStorage.getItem("login") ? true : false };
  },

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

      if (res.status == 201) {
        commit("changeAuth");
        localStorage.setItem("login", res.data.token);
        localStorage.setItem("id", res.data.userId);
        //router.push({ name: "all", query: { redirect: "/" } });
      }
    },

    async login({ commit }, { email, password }) {
      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });

      if (res.status == 202) {
        localStorage.setItem("login", res.data.token);
        localStorage.setItem("id", res.data.userId);
        commit("changeAuth");
        router.push({ name: "all", query: { redirect: "/" } });
      }
    },
  },
};
