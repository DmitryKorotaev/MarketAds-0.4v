<template>
  <div class="row">
    <div class="col-sm-6">
      <div
        class="card mb-4"
        style="width: 18rem"
        v-if="baseUrl.length > 0 && image"
      >
        <img :src="baseUrl + image" alt="image" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">{{ title }}</h5>
          <p class="card-text text-truncate">
            {{ description }}
          </p>
          <router-link :to="{ name: 'id', params: { id } }"
            ><h5 class="btn btn-dark btn-md btn-block mt-1">перейти</h5>
          </router-link>
        </div>
      </div>
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
      title: "",
      description: "",
      id: "",
      image: "",
      baseUrl: "http://localhost:4000/uploads/",
      index: 0,
    };
  },
  //Property or method "image" is not defined on the instance but referenced during render. Make sure that this property is reactive, either in the data option, or for class-based components, by initializing the property.
  //ads.js:25 TypeError: Cannot read properties of null (reading '0')
  //[Vue warn]: Error in mounted hook: "TypeError: Cannot read properties of null (reading '0')"
  //решение ошибок :
  mounted() {
    this.title = this.ads.title || "";
    this.description = this.ads.description || "";
    this.id = this.ads.ID || "";
    this.image =
      this.ads.image && this.ads.image.length > 0 ? this.ads.image[0] : "";
    //console.log(this.ads, "adds: Object");
  },
};
</script>
<style></style>
