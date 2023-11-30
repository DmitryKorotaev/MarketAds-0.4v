<template>
    <div class="app-main-layout">
      <navbar />
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  import Navbar from "@/components/Navbar.vue";
  
  export default {
    name: "main-layout",
  
    components: {
      Navbar,
    },
  };
  </script>
  
  <style></style>