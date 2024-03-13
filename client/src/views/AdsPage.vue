<template>
  <div class="container card">
    <h5 class="title">{{ title }}</h5>
    <div class="image" v-if="image">
      <img :src="baseUrl + image" alt="image" class="image-card" />
    </div>
    <div class="move">
      <button @click="moveLeft" class="btn-left btn btn-dark">&LT;</button>
      <button @click="moveRight" class="btn-right btn btn-dark">&GT;</button>
    </div>
    <div class="description">
      <p>{{ currentAds.description }}</p>
    </div>
    <div class="author">&nbsp; {{ `автор: ${name} (${numberPhone}) ` }}</div>
  </div>
</template>
<script>
export default {
  name: "id",
  data: () => ({
    currentAds: "",
    isChange: false,
    baseUrl: "http://localhost:4000/uploads/",
    index: 0,
    image: "",
    title: "",
    numberPhone: "",
    name: "",
  }),

  mounted() {
    try {
      const adsId = this.$route.params.id;
      console.log(adsId, "adsId adsPage mounted");
      // we expect ads using then, otherwise it returns undefined
      this.$store.dispatch("ads/getAds", adsId).then((ads) => {
        this.currentAds = ads[0];
        (this.image = this.currentAds.image[0]),
          (this.title = this.currentAds.title),
          (this.numberPhone = ads[1].numberPhone),
          (this.name = ads[1].name);
      });
    } catch (error) {
      return error;
    }
  },

  methods: {
    moveRight() {
      this.index != this.currentAds.image.length - 1
        ? this.index++
        : (this.index = 0);
      this.image = this.currentAds.image[this.index];
    },
    moveLeft() {
      this.index === 0
        ? (this.index = this.currentAds.image.length - 1)
        : this.index--;
      this.image = this.currentAds.image[this.index];
    },
  },
};
</script>
<style>
.container.card {
  display: flex;
  width: 800px;
  align-items: center;
  min-height: 600px;
  overflow: hidden;
  margin-bottom: 30px;
  margin-top: 30px;
  padding: 25px;
  text-align: center;
}

.image {
  float: left;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-size: cover;
  height: 300px;
  width: 400px;
  overflow: hidden;
  position: relative;
}
.image img {
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

.title {
  margin-top: 20px;
  position: relative;
  margin-bottom: 30px;
}
.description {
  margin-top: 30px;
  margin-bottom: 30px;
}
.move {
  border: none;
  margin-top: 30px;
}
.btn-right {
  margin-right: 10px;
}
.btn-left {
  margin-right: 10px;
}
</style>
