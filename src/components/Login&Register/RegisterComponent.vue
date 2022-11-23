<template>
  <div class="register-container">
    <form>
      <input name="name" v-model="this.name" type="text" placeholder="Nombre" />

      <input v-model="this.lastname" type="text" placeholder="Apellido" />

      <input
        type="email"
        name="email"
        v-model="this.email"
        placeholder="Email"
      />

      <input type="password" v-model="this.password" placeholder="Contraseña" />

      <input type="number" v-model="this.cuil" placeholder="CUIT" />

      <input type="button" value="Registrar" @click="registrar" />
    </form>
  </div>
</template>

<script>
import dbService from "@/services/dbService";

export default {
  name: "RegisterComponent",
  data() {
    return {
      name: "",
      lastname: "",
      email: "",
      password: "",
      cuil: 0,
    };
  },
  methods: {
    registrar() {
      let registro = {
        name: this.name,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
        cuil: this.cuil,
      };
      console.log(registro);
      dbService
        .postCreateUser(registro)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  margin: 50px;
  justify-content: space-around;
  align-items: center;
}

form {
  box-shadow: 0px 0px 10px #333;
  display: flex;
  flex-flow: column wrap;
  padding: 20px 40px;
  position: relative;
  z-index: 10;
  background: #fff;
}

form input {
  margin: 20px;
}
</style>
