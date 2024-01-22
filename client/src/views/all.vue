<template>
    <div class="container-fluid">
      <div class="col-md-6">
        <div class="inline" id="con1">
          <select class="form-select">
            <option selected disabled>Choose one</option>
            <option value="svsvsv">Автомобиль</option>
            <option value="авмв">Nt[ybrf]</option>
            <option value="кмкм">svsv</option>
            <option value="кмк">svdvs</option>
          </select>
        </div>
        <div class="input-group justify-content-center;">
          <input
            type="text"
            class="form-control"
            placeholder="Имя пользователя получателя"
            aria-label="Имя пользователя получателя"
            aria-describedby="button-addon2"
          />
          <button
            class="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >
            Кнопка
          </button>
        </div>
      </div>
      <post />
    </div>
  </template>
  
  <script>
  import post from "@/views/Post.vue";
  
  export default {
    components: {
      post,
    },
  };
  </script>
  
  <style>
  .container-fluid {
    min-width: 800px;
    
  }
  
  .form-select {
    display:flex;
    width: 170px;
    margin: 3em;
  }
  .input-group {
    display:flex;
    justify-content: center;
  
  }
  </style>