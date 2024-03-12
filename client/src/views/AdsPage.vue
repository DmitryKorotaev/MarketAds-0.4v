<template>
  <div class="container card">
    <div class="author">&nbsp; {{ `автор: ${name} (${numberPhone}) ` }}</div>
    <h5 class="title">{{ title }}</h5>
    <div class="image" v-if="image">
      <img :src="baseUrl + image" alt="image" class="image-card" />
    </div>
    <div class="description mt-1">
      <label for="description">описание:</label>

      <p>{{ currentAds.description }}</p>
    </div>
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
    login: "",
  }),

  mounted() {
    try {
      const adsId = this.$route.params.id;
      console.log(adsId, "adsId adsPage mounted");
      // we expect ads using then, otherwise it returns undefined
      this.$store.dispatch("ads/getAds", { adsId: adsId }).then((ads) => {
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
    maveRight() {
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
  width: 800px;
  min-height: 600px;
  overflow: hidden;
  margin-bottom: 30px;
  margin-top: 30px;
}
.image {
  width: 400px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
img {
  max-width: 100%;
  max-height: 100%;
}
.title {
  margin-top: 20px;
  position: relative;
  justify-content: center;
  margin-left: 25px;
}
</style>
