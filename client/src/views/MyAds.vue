<template>
  <div class="container">
    <ul v-if="myAds.length > 0">
      <li class="card" v-for="(adds, index) in myAds" :key="adds.id">
        <h5 class="title" v-if="isChange === false">{{ adds.title }}</h5>
        <div class="tilteInput" v-show="isChange" v-else>
          <input type="text" v-model="adds.title" />
        </div>
        <div class="image" v-for="(image, i) in adds.image" :key="image">
          <img :src="baseUrl + image" alt="image" />
          <button
            class="btn btn-danger"
            @click="onDeletePhoto(index, i)"
            v-show="isChange"
          >
            Delete
          </button>
        </div>

        <p class="description" v-if="isChange === false">
          {{ adds.description }}
        </p>
        <div class="descInput" v-show="isChange" v-else>
          <textarea
            class="form-control border border-dark-subtle mt-2"
            rows="5"
            type="text"
            v-model="adds.description"
          />
        </div>
        <div v-show="isChange">
          <select class="form-select" v-model="selected">
            <option disabled selected value>-- выберите категорию --</option>
            <option :value="{ value: 'other' }">other</option>
            <option :value="{ value: 'auto' }">Auto</option>
            <option :value="{ value: 'appliances' }">Appliances</option>
            <option :value="{ value: 'laptops' }">Laptops</option>
          </select>
        </div>

        <button
          type="button"
          class="btn btn-dark align-self-end btn-md btn-block"
          @click="changeAds"
        >
          {{ toChange }}
        </button>

        <button
          class="btn btn-success sub"
          @click="onSubmit(index)"
          v-show="isChange"
        >
          применить изменения
        </button>

        <Button
          class="btn btn-danger"
          @click="onRemoveAds(index)"
          v-show="isChange"
          >удалить</Button
        >
      </li>
    </ul>
    <span class="centered" v-else>объявлений пока нет.</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MyAds",
  data: () => ({
    baseUrl: "http://localhost:4000/uploads/",
    image: [],
    title: "",
    selected: "",
    isChange: false,
  }),

  computed: {
    toChange: function () {
      return this.isChange ? "сохранить" : "редактировать";
    },
    ...mapGetters("ads", ["myAds"]),
  },
  mounted() {
    try {
      const id = localStorage.getItem("id");
      console.log(id);
      if (id) {
        this.$store.dispatch("ads/getMyAds", { id });
      }
    } catch (error) {
      return error;
    }
  },

  methods: {
    changeAds() {
      this.isChange = !this.isChange;
    },
    onSubmit(index) {
      let category = "";
      this.selected.value === undefined
        ? (category = "other")
        : (category = this.selected.value);
      const adds = new Object({
        title: this.myAds[index].title,
        description: this.myAds[index].description,
        ID: this.myAds[index].ID,
        userId: this.myAds[index].userId,
        image: this.myAds[index].image,
        category: category,
      });
      console.log(adds, "страница myAds метод Update ");
      this.$store.dispatch("ads/updateAds", adds).then(() => {
        this.$store.dispatch("ads/getMyAds", { id: this.userId });
      });
    },
    onRemoveAds(index) {
      const adds = new Object({
        ID: this.myAds[index].ID,
      });
      this.myAds.splice(index, 1);
      console.log(adds);
      this.$store.dispatch("ads/deleteAds", adds);
    },
    onDeletePhoto(index, i) {
      this.myAds[index].image.splice(i, 1);
    },
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.card {
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: 80%;
  max-width: 600px;
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.image {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

img {
  max-width: 100%;
  height: auto;
  margin-right: 10px;
}

.description {
  margin-top: 10px;
}

.form-control {
  width: 100%;
}

.btn {
  margin-top: 10px;
}

.centered {
  text-align: center;
}
</style>
