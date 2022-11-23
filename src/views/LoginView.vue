<template>
  <div class="form-container">
    <form action="">
      <input type="button" value="Registrar Usuario" @click="opcionRegistrar" />
      <input type="button" value="Login" @click="opcionLogin" />
    </form>
  </div>
  <div v-if="this.mostrarRegistro" class="registrar-container">
    <RegisterComponent />
  </div>
  <div v-if="this.mostrarLogin" class="login-container">
    <LoginComponent />
  </div>
</template>

<script>
import RegisterComponent from "@/components/Login&Register/RegisterComponent.vue";
import LoginComponent from "@/components/Login&Register/LoginComponent.vue";

export default {
  name: "LoginView",
  components: {
    RegisterComponent,
    LoginComponent,
  },
  data() {
    return {
      mostrarRegistro: false,
      mostrarLogin: false,
    };
  },
  methods: {
    opcionRegistrar() {
      this.mostrarRegistro = this.mostrarRegistro ? false : true;
      return console.log();
    },
    opcionLogin() {
      this.mostrarLogin = this.mostrarLogin ? false : true;
      return console.log();
    },
  },
};
</script>

<style scoped></style>
