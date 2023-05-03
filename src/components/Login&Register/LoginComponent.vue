<template>
  <div class="login-container">
    <form>
      <img
        class="w-50"
        src="https://github.com/PabloBaronIT/frontend-oficina-virtual/blob/main/src/assets/muni-en-linea-logo.png?raw=true"
        alt=""
      />

      <FormKit
        type="form"
        id="registration-example"
        :actions="false"
        incomplete-message="Aun no has completado todos los campos."
      >
        <FormKit
          v-model="cuil"
          type="number"
          name="cuil"
          label="CUIL"
          placeholder="cuil"
          validation="required|length:11,11|number"
          :validation-messages="{
            required: 'Ingresa el CUIL sin simbolos ni espacios',
            number: 'Ingresar solo nùmeros',
            length: 'El CUIL debe tener 11 caracteres',
          }"
        />
        <FormKit
          v-model="password"
          type="password"
          name="password"
          label="Contraseña"
          placeholder="clave"
          @keyup.enter="log"
        />
        <input
          class="btn log-btn"
          type="button"
          value="Ingresar"
          @click="log"
        />
        <button class="btn log-btn">
          <!--<a href="https://cidi.test.cba.gov.ar/Cuenta/Login?app=551"-->
          <a href="https://cidi.cba.gov.ar/portal-publico/?App=551"
            >Ingresar con Cidi</a
          >
        </button>
      </FormKit>

      <!-- <div v-if="this.validar">
        <h2>Ingresaste correctamente</h2>
      </div> -->
      <div class="loading-container text-grey">
        <div v-if="this.loading" class="spinner-border loading" role="status">
          <span class="sr-only"></span>
        </div>
      </div>

      <p class="error">{{ this.msj }}</p>
    </form>
  </div>
</template>

<script>
// import { mapActions } from "vuex";
import dbService from "@/services/dbService";
import axios from "axios";

//ToDo
//Duracion e sesiones de usuario (charlar con patricio)
//Recordar sesion mediante cookies => Ver libreria js-cookie
//

export default {
  name: "LoginComponent",
  data() {
    return {
      cuil: null,
      password: "",
      validacion: null,
      msj: "",
      loading: false,
      user: {},
    };
  },
  created() {
    console.log(this.$route.query?.cidi, "cidi");
    if (this.$route.query?.cidi) {
      let cidivalue = String.toString(this.$route.query?.cidi);

      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
      });
      apiClient.post("/auth/cidi", { cidi: cidivalue }).then((response) => {
        console.log(response.data);
      });
    }

    localStorage.clear();
  },
  beforeRouteLeave(to, from, next) {
    localStorage.clear();
    next();
  },
  beforeRouteEnter(to, from, next) {
    localStorage.clear();
    next();
  },
  methods: {
    // ...mapActions(["mockLogin"]),
    dispatchLogin() {
      this.$store.dispatch("mockLoginAction", this.user);
    },

    log() {
      this.loading = true;

      dbService
        .postLoginUser({ password: this.password, cuil: this.cuil })
        .then((response) => {
          console.log(response.data);
          this.user = response.data.UserLogged;

          //se guarda los datos en el store
          this.dispatchLogin();
          //se guardan los datos en localstorage

          window.localStorage.clear();
          window.localStorage.setItem(
            "name",
            response.data.UserLogged.firstname
          );
          window.localStorage.setItem(
            "lastname",
            response.data.UserLogged.lastname
          );
          window.localStorage.setItem("cuil", response.data.UserLogged.cuil);
          window.localStorage.setItem(
            "adress",
            response.data.UserLogged.adress
          );
          window.localStorage.setItem("email", response.data.UserLogged.email);
          window.localStorage.setItem("id", response.data.UserLogged.id);
          window.localStorage.setItem(
            "fecha-creacion",
            response.data.UserLogged.created_at
          );

          window.localStorage.setItem("token", response.data.UserLogged.token);
          window.localStorage.setItem(
            "tokenCopia",
            response.data.UserLogged.token
          );

          window.localStorage.setItem("role", response.data.UserLogged.role);
          this.validacion = true;

          //this.$router.push("munienlinea");
          this.$router.push("representaciones");
        })
        .catch((error) => {
          console.log(error);
          this.validacion = false;
          this.msj = "Usuario incorrecto";
          this.loading = false;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    logCidi() {},
  },
};
</script>

<style scoped>
h1 {
  color: var(--red);
  font-weight: bold;
}
a {
  text-decoration: none;
  color: var(--text-color);
}

.error {
  color: red;
}

.log-btn {
  background: var(--red);
}

.deco {
  text-align: center;
  width: 200px;
  z-index: 1;
}

.login-container {
  width: 100vw;
  height: 100vh;
  --background-image: url("https://entemunicipioscba.org/wp-content/uploads/2018/09/munisacanta.jpg");
  z-index: 50;
  display: flex;
  margin: 10px;
  flex-flow: column wrap;
  justify-content: space-around;
  align-items: center;
}

form {
  width: 30%;
  box-shadow: 0px 0px 10px #333;
  display: flex;
  align-items: center;
  justify-content: baseline;
  flex-flow: column wrap;
  padding: 5% 10px;
  position: relative;
  z-index: 1;
  background: #ffffff9a;
  border-radius: 1rem;
}

form input {
  margin: 20px;
}

form img {
  margin-bottom: 15%;
}

@media (max-width: 750px) {
  .deco {
    display: none;
  }

  form {
    width: 70%;
  }
}
</style>
