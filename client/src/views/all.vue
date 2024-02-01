<template>
  <div class="container-fluid">
    <div class="col-md-6">
      <div class="inline" id="con1">
        <select id="inputState" class="form-selectet" v-model="selection">
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
        <button class="btn btn-success" @click="searchPost">Accept</button>
        <button
          class="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
        >
          Кнопка
        </button>
      </div>
    </div>
    <li class="list-group" v-for="post in posts" :key="post">
      <Post :Post="post" />
    </li>
  </div>
</template>

<script>
import Post from "@/views/Post.vue";

export default {
  components: {
    Post,
  },

  data: () => ({
    posts: [],
    selection: "",
    searchInput: "",
  }),

  mounted() {
    this.$nextTick(async () => {
      const response = await this.$axios.get("/api/post/all");
      this.posts = response.data;
    });
  },

  methods: {
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
}

.form-select {
  display: flex;
  width: 170px;
  margin: 3em;
}
.input-group {
  display: flex;
  justify-content: center;
}
</style>
