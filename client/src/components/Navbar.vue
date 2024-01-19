<template>
    <nav class="navbar navbar-dark bg-dark justify-content-between">
      <div class="container-fluid">
        <a class="navbar-brand"><img src="@/img/8UEdOr9L78U.jpg" alt="Market Ads" width="90" height="40"></a>
        <div class="indent">
          <router-link to="/Login" 
          class="text-decoration-none link-light"
          @click.prevent="enter"
            >Вход</router-link
          >
          <router-link to="/Creating-ads" class="text-decoration-none link-light"
            >Разместить объявление</router-link
          >
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    methods: {
      logout() {
        console.log("enter")
        this.$router.push('/Login?message=enter')
      }
    }

  };
  </script>

  
  <style>
  .indent a {
    line-height: 1em;
    display: inline-block;
    text-decoration: none;
    padding: 7px;
    margin: 2px;
  }
  .indent a:hover {
    color: #7fb7c0 !important;
  }
  
  .container-fluid {
    margin-top: -7px;
    max-width: 95% !important;
  }
  .navbar {
    min-width: 900px;
  }
  </style>