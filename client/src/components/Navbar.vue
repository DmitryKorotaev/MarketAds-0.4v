<template>
  <nav class="navbar navbar-dark bg-dark justify-content-between">
    <div class="container-fluid">
      <!-- <a class="navbar-brand"><img src="@/img/8UEdOr9L78U.jpg" alt="Market Ads" width="90" height="40"></a> -->
      <div class="indent">
        <button
          class="btn btn-outline-secondary mt-1"
          type="button"
          @click="logOut"
        >
          {{ login }}
        </button>
        <router-link to="/" class="link-light">главная </router-link>

        <router-link to="/Creating-ads" class="link-light"
          >Разместить объявление</router-link
        >
        <router-link to="/MyAds" class="link-light">
          Мои объявления
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logOut() {
      this.$store.dispatch("user/logout");
    },
  },
  computed: {
    login() {
      return this.$store.state.user.isAuth ? "выйти" : "войти";
    },
  },
};
</script>

<style>
.indent a:hover {
  color: #7fb7c0 !important;
}
.indent a {
  line-height: 1em;
  display: inline-block;
  text-decoration: none;
  padding: 7px;
  margin: 2px;
}

.container-fluid {
  margin-top: -7px;
  max-width: 95% !important;
}
.navbar {
  min-width: 900px;
}
.link-light {
  color: beige;
  text-decoration: none;
}
</style>
