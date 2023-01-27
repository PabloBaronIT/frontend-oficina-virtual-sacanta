<template>
  <div class="login-container">
    <form action="">
      <h1>Login Municipal</h1>
      <FormKit
        type="text"
        name="Cuil"
        id="Cuil"
        label="Cuil"
        help="Your full name"
        placeholder="“Jon Doe”"
        v-model="this.cuil"
      />
      <FormKit
        type="password"
        name="password"
        id="password"
        label="Password"
        help="Your password"
        placeholder="********"
        v-model="this.password"
      />
      <p style="color: red">{{ this.msj }}</p>
      <input
        @click="login()"
        class="btn btn-primary"
        type="button"
        value="Ingresar"
      />
    </form>
  </div>
</template>

<script>
import dbService from "@/services/dbService";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      cuil: null,
      password: "",
      msj: "",
    };
  },
  methods: {
    ...mapActions(["mockLogin"]),

    login() {
      let log = {
        password: this.password,
        cuil: this.cuil,
      };

      dbService
        .postLoginMunicipal(log)
        .then((response) => {
          if (response.status == 200) {
            localStorage.removeItem("token");
            this.validacion = true;
            this.mockLogin();
            localStorage.clear();
            localStorage.setItem("name", response.data.user.firstname);
            localStorage.setItem("lastname", response.data.user.lastname);
            localStorage.setItem("cuil", response.data.user.cuil);
            localStorage.setItem("adress", response.data.user.adress);
            localStorage.setItem("email", response.data.user.email);
            localStorage.setItem("id", response.data.user.id);
            localStorage.setItem(
              "fecha-creacion",
              response.data.user.created_at
            );
            localStorage.setItem("role", response.data.user.role);
            console.log(response.data);
            localStorage.setItem("token", response.data.token);
            this.$router.push("muni");
          }
        })
        .catch((error) => {
          console.log(error);
          this.msj = "Usuario incorrecto";
        });
    },
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
  padding: 120px 40px;
  position: relative;
  z-index: 1;
  background: #fff;
}
</style>
