<template>
  <div class="loginc-container">
    <form>
      <input type="number" placeholder="CUIT" v-model="this.cuil" />

      <input type="password" placeholder="Contraseña" v-model="this.password" />

      <input type="button" value="Ingresar" @click="login" />
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LoginComponent",
  data() {
    return {
      validar: true,
    };
  },
  methods: {
    login() {
      if (this.validar) {
        this.mockLogin();
        console.log("ok");
      }
    },
    ...mapActions(["mockLogin"]),
  },
};
</script>

<style></style>
