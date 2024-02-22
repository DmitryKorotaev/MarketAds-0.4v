<template>
  <div class="container">
    <ul>
      <li class="card" v-for="(adds, index) in myAds" :key="adds">
        <h5 class="title">{{ adds.title }}</h5>
        <div class="tilteInput" v-show="isChange">
          <input type="text" v-mode="adds.title" />
        </div>
        <div class="image" v-for="image in adds.image" :key="image">
          <img src="baseUrl + image" alt="image" />
          <button class="btn btn-danger"></button>
        </div>

        <p class="description">{{ adds.description }}</p>
        <div class="descInput" v-show="isChange">
          <input type="text" v-model="adds.description" />
        </div>
        <div v-show="isChange">
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="selected"
          >
            <option :value="{ value: 'other' }" selected>none</option>
            <option :value="{ value: 'auto' }">Auto</option>
            <option :value="{ value: 'appliances' }">Appliances</option>
            <option :value="{ value: 'laptops' }">Laptops</option>
          </select>
        </div>
        <button
          type="button"
          class="btn btn-dark btn-md btn-block"
          @click="changeAds"
        >
          {{ toChange }}
        </button>
        <button
          type="button"
          class="btn btn-success sub"
          @click="onSubmit(index)"
          v-show="isChange"
        >
          submit
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MyAds",
  data: () => ({
    myAds: [],
    title: "",
    selected: "",
    image: "",
    isChange: false,
    baseUrl: "http://localhost:4000/",
  }),
  computed: {
    toChange: function () {
      return this.isChange ? "сохранить" : "редактировать";
    },
  },
  mounted() {
    this.$store
      .dispatch("ads/myAds", { id })
      .then((res) => {
        this.myAds = res;
      })
      .catch((error) => {
        return error;
      });
  },

  methods: {
    changeAds() {
      this.isChange = !this.isChange;
    },
    onsubmit(index) {
      let category = "";
      this.selected.value === undefined
        ? (category = "other")
        : (category = this.selected.value);
      const adds = new Object({
        title: this.title.myAds[index].title,
        decriptions: this.descriptions.myAds[index].title,
        ID: this.myAds[index].ID,
        userId: this.userId[index].userId,
        image: this.myAds[index].image,
        category: category,
      });
      this.$store.dispatch("ads/update", adds);
    },
    onRemove(index) {
      const adds = new Object({
        ID: this.myAds[index].ID,
      });
    },
  },
};
</script>
