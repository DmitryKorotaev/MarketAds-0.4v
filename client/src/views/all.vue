<template>
  <div class="container-fluid">
    <div class="col-md-6" v-if="adds.length > 0">
      <div class="inline">
        <select id="inputState" class="form-select" v-model="selection">
          <option disabled selected value>Выберите категорию</option>
          <!-- вместо объектов берем стороки для отклика на изменение при поиске -->
          <option value="all">Показать все</option>
          <option value="other" selected>Другое</option>
          <option value="auto">Автомобили</option>
          <option value="realEstate">Недвижимость</option>
          <option value="electronics">Электроника</option>
        </select>
      </div>
      <div class="input-group justify-content-center;">
        <input
          type="search"
          class="form-control"
          v-model="searchInput"
          aria-describedby="button-addon2"
        />

        <!-- <button
          class="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          @click="searchAds"
        >
          найти
        </button> -->
      </div>

      <li class="row" v-for="(ad, idx) in displayedAds" :key="idx">
        <ads :ads="ad" />
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
    ...mapGetters("ads", ["search"]),
    displayedAds() {
      if (
        (this.searchInput.trim() && this.searchInput !== "") ||
        (this.selection && this.selection !== "")
      ) {
        return this.search;
      } else {
        return this.adds;
      }
    },
  },
  watch: {
    searchInput: function (newInput) {
      if (newInput.trim() && newInput !== "") {
        this.searchAds();
      } else if (this.selection && this.selection !== "") {
        this.searchAds();
      } else {
        this.$store.dispatch("ads/getAllAds");
      }
    },
    selection: function (newSelection) {
      if (
        (newSelection && newSelection !== "") ||
        (this.newInput.trim() && this.newInput !== "")
      ) {
        // console.log(newSelection, "selection watch");
        this.searchAds();
      } else {
        this.$store.dispatch("ads/getAllAds");
      }
    },
  },

  methods: {
    async searchAds() {
      try {
        const selector = this.selection || "all";
        //console.log(selector, "this.selection");
        const params = new Object({
          selector: selector,
          input: this.searchInput,
        });
        // console.log(params, "all.vue searchAds");
        await this.$store.dispatch("ads/searchInput", params);
      } catch (error) {
        return console.log("ошибка поиска объявления"), error;
      }
    },
    // -----------BTN INPUN------------------------------
    //  async handleSearch() {
    //   if (this.searchInput.trim() !== "") {
    //     this.searchAds();
    //   } else {
    //     this.$store.dispatch("ads/getAllAds");
    //   }
    // },
    // async searchAds() {
    //   try {
    //     let selector = new String();
    //     this.selection.value === undefined
    //       ? (selector = "other")
    //       : (selector = this.selection.value);
    // const params = new Object({
    //       selector: selector,
    //       input: this.searchInput,
    //     });
    //     //console.log(params, "all.vue searchAds");

    //     await this.$store.dispatch("ads/searchInput", params);
    //   } catch (error) {
    //     return console.log("ошибка поиска объявления"), error;
    //   }
    // },
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
  width: 250px;
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
