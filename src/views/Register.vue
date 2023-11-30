<template>
    <form class="form1" @submit.prevent="submitHandler">
      <div class="d-flex justify-content-center mb-3 pb-1">
        <i class="fas fa-cubes fa-2x me-3"></i>
      </div>
  
      <h5
        class="d-flex justify-content-center mb-3 pb-1"
        style="letter-spacing: 1px"
      >
        Регистрация аккаунта:
      </h5>
  
      <div class="form-outline mb-2">
        <label class="form-label mb-1" for="numberPhone">Номер телефона:</label>
        <input
          type="numberPhone"
          id="numberPhone"
          class="form-control form-control-md"
          v-model.trim="numberPhone"
          :class="{
            invalid:
              ($v.numberPhone.$dirty && !$v.numberPhone.required) ||
              ($v.numberPhone.$dirty && !$v.numberPhone.minLength) ||
              ($v.numberPhone.$dirty && !$v.numberPhone.maxLength) ||
              ($v.numberPhone.$dirty && !$v.numberPhone.isMobileNumberPhone),
          }"
        />
        <span
          class="error"
          v-if="$v.numberPhone.$dirty && !$v.numberPhone.required"
          >Поле 'Номер телефона' не должно быть пустым</span
        >
        <span
          class="error"
          v-else-if="
            ($v.numberPhone.$dirty &&
              (!$v.numberPhone.minLength || !$v.numberPhone.maxLength)) ||
            ($v.numberPhone.$dirty && !$v.numberPhone.isMobileNumberPhone)
          "
        >
          Введите корректный номер телефона
        </span>
      </div>
  
      <div class="form-outline mb-2 mt-4">
        <label class="form-label mb-1" for="name">Имя:</label>
        <input
          type="text"
          id="name"
          class="form-control form-control-md"
          v-model.trim="name"
          :class="{
            invalid:
              ($v.name.$dirty && !$v.name.required) ||
              ($v.name.$dirty && !$v.name.minLength) ||
              ($v.name.$dirty && !$v.name.maxLength),
          }"
        />
        <span class="error" v-if="$v.name.$dirty && !$v.name.required"
          >Поле Имя не должно быть пустым</span
        >
        <span class="error" v-else-if="$v.name.$dirty && !$v.name.minLength"
          >Имя должно быть не менее
        </span>
        <span class="error" v-else-if="$v.name.$dirty && !$v.name.maxLength"
          >Имя должно быть не более
        </span>
      </div>
  
      <div class="form-outline mb-2 mt-4">
        <label class="form-label mb-1" for="email">E-mail:</label>
        <input
          type="text"
          id="email"
          class="form-control form-control-md"
          v-model.trim="email"
          :class="{
            invalid:
              ($v.email.$dirty && !$v.email.required) ||
              ($v.email.$dirty && !$v.email.email),
          }"
        />
        <span class="error" v-if="$v.email.$dirty && !$v.email.required"
          >Поле Email не должно быть пустым</span
        >
        <span class="error" v-else-if="$v.email.$dirty && !$v.email.email"
          >Введите корректный Email</span
        >
      </div>
  
      <div class="form-outline mb-2 mt-4">
        <label class="form-label mb-1" for="password"> Пароль:</label>
        <input
          type="password"
          id="password"
          class="form-control form-control-md"
          v-model.trim="password"
          :class="{
            invalid:
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength),
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
  
      <div class="form-outline mb-2 mt-4">
        <label class="form-label mb-1" for="passwordConfirm"
          >Повторите пароль:</label
        >
        <input
          type="password"
          id="passwordConfirm"
          class="form-control form-control-md"
          v-model.trim="passwordConfirm"
          :class="{
            invalid:
              ($v.passwordConfirm.$dirty && !$v.passwordConfirm.required) ||
              ($v.passwordConfirm.$dirty && !$v.passwordConfirm.sameAsPassword),
          }"
        />
        <span
          class="error"
          v-if="$v.passwordConfirm.$dirty && !$v.passwordConfirm.required"
          >Повторите пароль</span
        >
        <span
          class="error"
          v-else-if="
            $v.passwordConfirm.$dirty && !$v.passwordConfirm.sameAsPassword
          "
          >Пароли должны совпадать</span
        >
      </div>
  
      <div class="pt-2 mb-2 d-flex justify-content-center">
        <button class="mb-2 pb-3 mt-4 btn btn-dark btn-md" type="submit">
          Зарегистрироваться
        </button>
      </div>
  
      <div class="text-center">
        <a class="small text-muted" href="#!">забыли пароль?</a>
        <p class="mb-1 pb-md-2">
          У вас уже есть учетная запись?
  
          <router-link style="color: #393f81" to="/Login">Войти</router-link>
        </p>
      </div>
    </form>
  </template>
  
  <script>
  
  import {
    required,
    minLength,
    maxLength,
    sameAs,
    email,
  } from "vuelidate/lib/validators";
  
  const isMobileNumberPhone = (value) => {
    const numberPhoneRegex = /^((\+7|7|8)+([0-9]){10})$/;
  
    return numberPhoneRegex.test(value);
  };
  
  export default {
    name: "Register",
  
    data: () => ({
      numberPhone: "",
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    }),
  
    validations: {
      numberPhone: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(12),
        isMobileNumberPhone,
      },
      name: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(30),
      },
      email: { email, required },
      password: { required, minLength: minLength(6) },
      passwordConfirm: {
        required,
        sameAsPassword: sameAs("password"),
      },
    },
  
    methods: {
      submitHandler() {
        console.log(this.$v);
        if (this.$v.$invalid) {
          this.$v.$touch();
          return;
        }
        const formData = {
          numberPhone: this.numberPhone,
          name: this.name,
          email: this.email,
          password: this.password,
          passwordConfirm: this.passwordConfirm,
        };
        console.log(formData);
        this.$router.push("/");
      },
    },
  };
  </script>
  
  <style>
  .form1 {
    width: 400px;
    margin: 0 auto;
  }
  
  .fas-fa-cubes-fa-2x-me-3 {
    color: #ff6219;
  }
  
  .small-text-muted {
    color: #393f81;
  }
  .error {
    color: red;
  }
  </style>
  