<template>
  <div class="form-container">
    <div>
      <input type="button" value="Registrar Usuario" @click="opcionRegistrar" />
      <input type="button" value="Login" @click="opcionLogin" />
      <h2>Municipalidad de Campo Bravo</h2>
      <div v-if="this.mostrarRegistro" class="registrar-container">
        <RegisterComponent />
      </div>
      <div v-if="this.mostrarLogin" class="login-container">
        <LoginComponent />
      </div>
    </div>
  </div>

  <div class="background"></div>
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
      mostrarLogin: true,
    };
  },
  methods: {
    opcionRegistrar() {
      this.mostrarLogin = false;
      this.mostrarRegistro = this.mostrarRegistro ? false : true;
      return console.log();
    },
    opcionLogin() {
      this.mostrarRegistro = false;
      this.mostrarLogin = this.mostrarLogin ? false : true;
      return console.log();
    },
  },
};
</script>

<style scoped>
.background {
  height: 300px;
  width: 100%;
  background-color: var(--blue);
  position: absolute;
  bottom: 0;
}

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
