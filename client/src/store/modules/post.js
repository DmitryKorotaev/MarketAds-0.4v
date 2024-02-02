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
      console.log(options, "options");

      try {
        const f = new FormData();
        for (let i = 0; i < options.files.length; i++) {
          let file = options.files[i];
          console.log(file, "file");
          f.append("files", file);
          f.append("id", state.id);
          f.append("title", options.title);
          f.append("description", options.description);
          f.append("category", options.category);
        }

        const res = await axios.post("/api/post/add", f, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.status == 201) {
          commit("changeCreate");
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
    async all(context, data) {
      try {
        const res = await axios.get(`/api/post/all`);
        if (res.data) {
          return res.data;
        }
      } catch (error) {
        return error;
      }
    },
  },
};
