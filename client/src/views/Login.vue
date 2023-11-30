<template>
    <div>
      <form class="form2" @submit.prevent="submitHandler">
        <div class="d-flex justify-content-center mb-3 mt-2 pb-1">
          <i class="fas fa-cubes fa-2x me-3"></i>
          <span class="h1 fw-bold mb-0"
            ><img
              src="@/img/8UEdOr9L78U.jpg"
              alt="Market Ads"
              width="150"
              height="100"
          /></span>
        </div>
  
        <h5 class="fw-normal mb-3 pb-3 text-center" style="letter-spacing: 1px">
          Войдите в учетную запись
        </h5>
  
        <div class="form-outline mb-4 mt-4">
          <label class="form-label mb-1" for="email">Введите Email</label>
          <input
            id="email"
            type="text"
            class="form-control form-control-md"
            v-model.trim="email"
            :class="{
              invalid:
                ($v.email.$dirty && $v.email.required) ||
                ($v.email.$dirty && $v.email.email),
            }"
          />
          <span class="error" v-if="$v.email.$dirty && !$v.email.required"
          >Поле Email не должно быть пустым</span
        >
        <span class="error" v-else-if="$v.email.$dirty && !$v.email.email"
          >Введите корректный Email</span
        >
        </div>
  
        <div class="form-outline mb-4 mt-4">
          <label class="form-label mb-1">Введите пароль</label>
          <input
            id="password"
            type="password"
            class="form-control form-control-md"
            v-model.trim="password"
            :class="{
              invalid:
                ($v.password.$dirty && $v.password.required) ||
                ($v.password.$dirty && $v.password.minLength),
            }"
          />
          <span class="error" v-if="$v.password.$dirty && !$v.password.required"
          >Введите пароль</span
        >
        <span
          class="error"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
          >Пароль должен быть {{ $v.password.$params.minLength.min }} символов.
          Сейчас он {{ password.length }}
        </span>
        </div>
  
        <div class="pt-1 mb-4 mt-5 d-flex justify-content-center">
          <button class="btn btn-dark btn-lg btn-block" type="submit">
            Войти
          </button>
        </div>
        <div class="text-center">
          <a class="small text-muted" href="#!">забыли пароль?</a>
          <p class="mb-5 pb-lg-2">
            У вас уже есть аккаунт ?
            <router-link to="/Register">Зарегистрируйтесь тут</router-link>
          </p>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  
  import { required, email, minLength } from "vuelidate/lib/validators";
  
  export default {
    name: "Login",
    data: () => ({
      email: "",
      password: "",
    }),
  
    validations: {
      email: { email, required },
      password: { required, minLength: minLength(8) },
    },
  
    methods: {
      submitHandler() {
        console.log(this.$v);
        if (this.$v.$invalid) {
          this.$v.$touch();
          
          return;
        }
        const formData = {
          email: this.email,
          password: this.password,
        };
        this.$router.push("/");
      },
    },
  };
  </script>
  
  <style>
  .form2 {
    width: 400px;
    margin: 0 auto;
  }
  
  .mb-5.pb-lg-2 {
    color: #393f81;
  }

  .error {
    color: red;
  }
  </style>
  