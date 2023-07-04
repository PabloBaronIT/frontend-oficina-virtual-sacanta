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
//import dbService from "@/services/dbService";
import axios from "axios";

export default {
  data() {
    return {
      cuil: null,
      password: "",
      msj: "",
      user: {},
    };
  },
  methods: {
    dispatchLogin() {
      this.$store.dispatch("mockLoginAction", this.user);
    },

    login() {
      localStorage.removeItem("token");

      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .post("/auth/signinMunicipales", {
          cuil: this.cuil,
          password: this.password,
        })

        .then(async (response) => {
          if (response.status == 200) {
            console.log(response.data.Token.token);
            let token = response.data.Token.token;
            localStorage.setItem("token", token);
            this.getMyProfile();
            this.$router.push("muni");

            //TOMO LOS DATOS DEL TOKEN
            //let payload = await dbService.getToken(token);
            //console.log(payload);
          }
        })
        .catch((error) => {
          console.log(error);
          this.msj = "Usuario incorrecto";
        });
    },
    getMyProfile() {
      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient.get("/municipales/muni-profile").then((response) => {
        console.log(response.data);
        this.user = response.data.MuniProfile.muni;
        this.dispatchLogin();

        window.localStorage.setItem(
          "name",
          response.data.MuniProfile.muni.firstname
        );
        window.localStorage.setItem(
          "lastname",
          response.data.MuniProfile.muni.lastname
        );
        window.localStorage.setItem(
          "cuil",
          response.data.MuniProfile.muni.cuil
        );

        window.localStorage.setItem(
          "email",
          response.data.MuniProfile.muni.email
        );
        window.localStorage.setItem("id", response.data.MuniProfile.muni.id);
        window.localStorage.setItem(
          "fecha-creacion",
          response.data.MuniProfile.muni.created_at
        );
        window.localStorage.setItem(
          "role",
          response.data.MuniProfile.muni.role
        );
        this.validacion = true;
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
