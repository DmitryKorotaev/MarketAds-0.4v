export default {
  namespaced: true,
  state() {
    return {
      isCreate: false,
      id: localStorage.getItem("id"),
    };
  },
  // getters: {},
  mutations: {
    changeCreate(state) {
      state.isCreate = !state.isCreate;
    },
    message(state) {
      if (state.isCreate) {
        return true;
      }
    },
  },
  actions: {
    async create({ commit, state }, formData) {
      try {
        formData.append("id", state.id);
        const res = await axios.post("/api/post/add", formData);
      } catch {}
    },
  },
};
