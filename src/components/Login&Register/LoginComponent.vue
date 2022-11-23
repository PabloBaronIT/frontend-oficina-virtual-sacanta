<template>
  <div class="login-container">
    <form>
      <input type="number" placeholder="CUIT" v-model="this.cuil" />

      <input type="password" placeholder="Contraseña" v-model="this.password" />

      <router-link to="/munienlinea"
        ><input type="button" value="Ingresar" @click="login"
      /></router-link>
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

<style scoped>
.login-container {
  display: flex;
  margin: 50px;
  justify-content: space-around;
  align-items: center;
}

form {
  box-shadow: 0px 0px 10px #333;
  display: flex;
  flex-flow: column wrap;
  padding: 150px 40px;
  position: relative;
  z-index: 10;
  background: #fff;
}

form input {
  margin: 20px;
}
</style>
