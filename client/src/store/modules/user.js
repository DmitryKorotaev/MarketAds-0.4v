import router from "@/router";

export default {
  namespaced: true,
  state() {
    return { islogin: localStorage.getItem("login") ? true : false };
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

      if (res.status == 201) {
        commit("changeAuth");
        localStorage.setItem("login", res.data.token);
        localStorage.setItem("id", res.data.userId);
        router.push({ name: "/", query: { redirect: "/" } });
      }
    },

    async login({ commit }, { numberPhone, password }) {
      const res = await axios.post("/api/auth/login", {
        numberPhone,
        password,
      });

      if (res.status == 202) {
        localStorage.setItem("login", res.data.token);
        localStorage.setItem("id", res.data.userId);
        commit("changeAuth");
        router.push({ name: "/", query: { redirect: "/" } });
      }
    },
  },
};
