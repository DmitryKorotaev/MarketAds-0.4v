import router from "@/router";
import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      id: localStorage.getItem("id"),
      isCreate: false,
      adds: [],
      myAds: [],
      search: [],
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
      //console.log(adds, " store mutations adds");
    },
    myAds(state, myAds) {
      state.myAds = myAds;
    },
    searchAds(state, search) {
      state.search = search;
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
    async getAllAds({ commit }) {
      try {
        const res = await axios.get("/api/ads/all");
        if (res.data) {
          commit("allAds", res.data);
          //console.log(res.data, " store actions res.data");
        } else {
          res.status == 404;
        }
      } catch (error) {
        return error;
      }
    },
    async getAds({ commit }, data) {
      try {
        //console.log(data.adsId);
        const res = await axios.get(`/api/ads/all/${data.adsId}`);
        if (res.data) {
          commit("allAds", res.data);
          return res.data;
        } else {
          return res.status === 404;
        }
      } catch (error) {
        return error;
      }
    },

    // async getMyAds({ commit }, data) {
    //   try {
    //     const res = await axios.get(`/api/ads/myAds/${data.id}`);
    //     if (res.status == 200) {
    //       commit("myAds", res.data);
    //     } else {
    //       res.status == 404;
    //     }
    //   } catch (error) {
    //     error;
    //   }
    // },

    async deleteAds({ commit }, data) {
      try {
        const res = await axios.post("/api/ads/myAds/delete", data);
        if (res.status == 200) {
          //console.log(res.data, "store actions deleteAds");
          console.log("the ad has been deleted!!");
          commit("myAds", res.data);
        } else {
          console.log("error deleting ads" + res.status);
        }
      } catch (error) {
        return error;
      }
    },
    // async updateAds({ commit }, data) {
    //   try {
    //     console.log(data, "actions adsUpdate data");
    //     const res = await axios.post("/api/ads/myAds/update", data);
    //     if (res.status == 200) {
    //       console.log(res.data, "store actions updataAds");
    //       commit("myAds", res.data);
    //     } else {
    //       console.log("error update ads" + res.status);
    //     }
    //   } catch (error) {
    //     return error;
    //   }
    // },

    async searchInput({ commit }, data) {
      try {
        console.log(data, "actions searchInput data");
        const res = await axios.post(`/api/ads/search`, data);
        if (res.status == 201) {
          commit("searchAds", res.data);
        } else {
          return console.log("Something went wrong :(");
        }
      } catch (error) {
        return error;
      }
    },
    async updateAds(context, data) {
      try {
        const res = await axios.post("/api/ads/myAds/update", data);
        if (res.status == 200) {
          console.log("ads updated successfully");
        } else {
          console.log("Error updating post...");
        }
      } catch (error) {
        return error;
      }
    },
    async getMyAds(context, data) {
      try {
        const res = await axios.get(`/api/ads/myAds/${data.id}`);
        if (res.status == 200) {
          console.log(res.data, " store actions myAds");
          return res.data;
        }
      } catch (error) {
        error;
      }
    },
  },
  getters: {
    adds: (state) => state.adds,
    myAds: (state) => state.myAds,
    search: (state) => state.search,
  },
};
// async deleteAds(context, data) {
//   try {
//     const res = await axios.post(`/api/ads/myAds/delete`, data);
//     if (res.status == 200) {
//       console.log(res.data, "store actions deleteAds");
//       console.log("the ad has been deleted!!");
//       return res.data;
//     } else {
//       console.log("error deleting ads" + res.status);
//     }
//   } catch (error) {
//     return error;
//   }
// },
