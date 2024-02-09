<template>
  <div class="card">
    <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
      <img :src="baseUrl + image" alt="image" class="img-fluid" />
      <a href="#!">
        <div
          class="mask"
          style="background-color: rgba(251, 251, 251, 0.15)"
        ></div>
      </a>
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <router-link :to="{ name: 'id', params: { id } }"
        ><h5 class="btn btn-info link">About</h5>
      </router-link>
      <!-- <p class="card-text">
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </p> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ads: Object,
  },

  data() {
    return {
      title: this.ads.title,
      description: this.ads.description,
      id: this.ads.ID,
      image: this.ads.image[0],
      baseUrl: "http://localhost:4000/",
      index: 0,
    };
  },
  mounted() {
    console.log(this.ads, "adds: Object");
  },
};
</script>
<style>
.card {
  margin-top: 30px;
  width: 250px;
}

.card-text {
  font-size: 14px;
  position: relative;
}
</style>
