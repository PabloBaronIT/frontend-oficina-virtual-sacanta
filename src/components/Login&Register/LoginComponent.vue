<template>
  <div class="login-container">
    <div class="deco">
      <h2>Municipalidad de campo Bravo</h2>
    </div>

    <form>
      <section>
        <i class="bi bi-person-vcard"></i>
        <input type="number" placeholder="CUIT" v-model="this.cuil" />
      </section>
      <section>
        <i class="bi bi-key"></i>
        <input
          type="password"
          placeholder="Contraseña"
          v-model="this.password"
        />
      </section>

      <router-link to="/munienlinea"
        ><input type="button" value="Ingresar" @click="login"
      /></router-link>
    </form>

    <div class="deco">
      <h2>Muni En Linea</h2>
    </div>
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
.deco {
  text-align: center;
  width: 200px;
  z-index: 1;
}

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
  padding: 120px 40px;
  position: relative;
  z-index: 10;
  background: #fff;
}

form input {
  margin: 20px;
}
</style>
