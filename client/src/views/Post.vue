<template>
  <div class="card">
    <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
      <img :src="baseUrl + image" alt="" class="img-fluid" />
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
      <p class="card-text">
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    post: Object,
  },
  data: () => ({
    title: this.post.title,
    description: this.post.description,
    id: this.post.ID,
    image: this.post.image[0],
    baseUrl: "http://localhost:4000",
    index: 0,
  }),
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
