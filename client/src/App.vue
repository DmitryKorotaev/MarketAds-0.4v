<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import MainLayout from "./layout/MainLayout.vue";
import EmptyLayout from "./layout/EmptyLayout.vue";

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout";
    },
  },

  components: {
    MainLayout,
    EmptyLayout,
  },
};
</script>

<style></style>

