import router from "@/router";
import axios from "axios";

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
    async create({ commit, state }, options) {
      try {
        const formData = new FormData();
        // options.files.forEach((file) => {
        //   formData.append("files", file);
        // });
        for (let i = 0; i < options.files.length; i++) {
          let file = options.files[i];
          fd.append("files", file);
        }
        formData.append("title", options.title);
        formData.append("description", options.description);
        formData.append("id", state.id);
        formData.append("category", options.category);
        const res = await axios.post("/api/post/add", formData);
        if (res.status == 201) {
          commit(changeCreate);
        }
        const created = commit("message");
        if (created) {
          commit("changeCreate");
          return { message: "ads has been created!" };
        }
      } catch (error) {
        return error;
      }
    },
  },
};
