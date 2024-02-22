import router from "@/router";
import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      isCreate: false,
      id: localStorage.getItem("id"),
      adds: [],
    };
  },

  mutations: {
    changeCreate(state) {
      state.isCreate = !state.isCreate;
    },
    message(state) {
      if (state.isCreate) {
        return true;
      }
    },
    allAds(state, adds) {
      state.adds = adds;
      console.log(adds, "adds");
    },
  },
  actions: {
    async create({ commit, state }, options) {
      try {
        const f = new FormData();
        for (let i = 0; i < options.files.length; i++) {
          let file = options.files[i];
          f.append("files", file);
        }
        f.append("id", state.id);
        f.append("title", options.title);
        f.append("description", options.description);
        f.append("category", options.category);

        const res = await axios.post("/api/ads/add", f, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.status == 201) {
          commit("changeCreate");
        }
        const created = commit("message");
        //console.log(state.isCreate);
        if (created) {
          commit("changeCreate");
        }
        return (
          { message: "ads has been created!" },
          router.push({ name: "all", query: { redirect: "/" } })
        );
      } catch (error) {
        return error;
      }
    },
    async all({ commit }) {
      try {
        const res = await axios.get("api/ads/all");
        if (res.data) {
          commit("allAds", res.data);
          console.log(res.data, "res.data");
        } else {
          res.status == 404;
        }
      } catch (error) {
        return error;
      }
    },
    async myAds(context, data) {
      try {
        const res = await axios.get(`api/ads/myAds/${data.id}`);
        if (res.status == 200) {
          console.log(res.data, "myAds");
          return res.data;
        }
      } catch (error) {
        error;
      }
    },
  },
  getters: {
    adds: (state) => state.adds,
  },
};
