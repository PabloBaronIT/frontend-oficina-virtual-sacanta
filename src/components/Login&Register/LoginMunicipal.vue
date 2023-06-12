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

      let log = {
        cuil: this.cuil,
        password: this.password,
      };

      dbService
        .postLoginMunicipal(log)
        .then(async (response) => {
          if (response.status == 200) {
            console.log(response.data.Token.token);
            let token = response.data.Token.token;
            //TOMO LOS DATOS DEL TOKEN
            localStorage.setItem("token", token);
            let payload = await dbService.getToken(token);
            console.log(payload);
            if (token) {
              this.getMyProfile();
            }
            //this.user = response.data.MuniLogged;
            //this.dispatchLogin();

            // this.validacion = true;
            //localStorage.clear();
            //localStorage.setItem("name", response.data.MuniLogged.firstname);
            //localStorage.setItem("lastname", response.data.MuniLogged.lastname);
            // localStorage.setItem("cuil", response.data.MuniLogged.cuil);
            // localStorage.setItem("email", response.data.MuniLogged.email);
            // localStorage.setItem("id", response.data.MuniLogged.id);
            //localStorage.setItem("role", response.data.MuniLogged.role);
            //localStorage.setItem("token", response.data.MuniLogged.token);
            // this.$router.push("muni");
          }
        })
        .catch((error) => {
          console.log(error);
          this.msj = "Usuario incorrecto";
        });
    },
    getMyProfile() {
      dbService.getProfileMunicipal().then((response) => {
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

        // window.localStorage.setItem(
        ///"role",
        // response.data.UserProfile.user.role
        //);
        window.localStorage.setItem("role", "MUNI_ROLE");
        this.validacion = true;
        this.$router.push("muni");
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
