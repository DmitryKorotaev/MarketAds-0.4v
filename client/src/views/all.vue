<template>
  <div class="container-fluid">
    <div class="col-md-6" v-if="adds.length > 0">
      <div class="inline" id="con1">
        <select id="inputState" class="form-select" v-model="selection">
          <option :value="{ value: 'other' }" selected>other</option>
          <option :value="{ value: 'auto' }">Автомобили</option>
          <option :value="{ value: 'realEstate' }">Недвижимость</option>
          <option :value="{ value: 'electronics' }">Электроника</option>
        </select>
      </div>
      <div class="input-group justify-content-center;">
        <input
          type="text"
          class="form-control"
          v-model="searchInput"
          aria-describedby="button-addon2"
        />

        <button
          class="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          @click="searchPost"
        >
          найти
        </button>
      </div>

      <li class="list-group" v-for="(ads, idx) in adds" :key="idx">
        <ads :ads="ads" />
      </li>
    </div>
    <span class="centered" v-else>объявлений пока нет.</span>
  </div>
</template>

<script>
import ads from "@/components/Ads.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    ads,
  },

  data: () => ({
    selection: "",
    searchInput: "",
  }),
  mounted() {
    this.$store.dispatch("ads/getAllAds");
  },
  computed: {
    ...mapGetters("ads", ["adds"]),
  },

  methods: {
    // async fetchData() {
    //   try {
    //     const res = await this.$axios.get("/api/post/all");
    //     this.adds = res.data;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async searchPost() {
      try {
        let selector = new String();
        this.selection.value === undefined
          ? (selector = "other")
          : (selector = this.selection.value);
        const params = new Object({
          selector: selector,
          input: this.searchInput,
        });
        // const response = await this.$store.dispatch('.......', params)
        //         this.posts = response
        //         this.searchInput = ''
      } catch (error) {
        return console.log("ошибка поиска объявления"), error;
      }
    },
  },
};
</script>

<style>
.container-fluid {
  min-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
}

.col-md-6 {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.col-md-4 {
  margin-right: 10px;
}

.inline {
  display: flex;
  align-items: center;
  margin-bottom: 1em;
}

.form-select {
  width: 150px;
  margin-right: 1em;
}

.form-control {
  width: 300px;
}

.input-group {
  display: flex;
  justify-content: center;
  margin-bottom: 2em;
}

.btn {
  margin-left: 1em;
}

.list-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2em;
}

.centered {
  width: 100%;
  position: fixed;
  top: 50%;
  left: 45%;
}
</style>
