<template>
  <div class="card">
    <div class="row"></div>
    <div class="bg-image hover-overlay ripple">
      <img :src="baseUrl + image" alt="image" class="img-thumbnail" />
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
        ><h5 class="btn btn-dark btn-md btn-block mt-1">About</h5>
      </router-link>
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
      baseUrl: "http://localhost:4000/uploads/",
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
  margin-top: 35px;
  width: 250px;
  height: 430px;
}
</style>
