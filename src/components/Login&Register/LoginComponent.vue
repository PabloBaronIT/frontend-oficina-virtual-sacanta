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
          label="Clave"
          placeholder="clave"
          @keyup.enter="log"
        />
        <input
          class="btn log-btn"
          type="button"
          value="Ingresar"
          @click="log"
        />
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
import { mapActions } from "vuex";
import dbService from "@/services/dbService";

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
    };
  },
  created() {
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
    ...mapActions(["mockLogin"]),

    log() {
      this.loading = true;

      dbService
        .postLoginUser({ password: this.password, cuil: this.cuil })
        .then((response) => {
          localStorage.removeItem("token");
          this.validacion = true;
          console.log(response.data);
          //this.mockLogin();
          localStorage.clear();
          localStorage.setItem("name", response.data.UserLogged.firstname);
          localStorage.setItem("lastname", response.data.UserLogged.lastname);
          localStorage.setItem("cuil", response.data.UserLogged.cuil);
          localStorage.setItem("adress", response.data.UserLogged.adress);
          localStorage.setItem("email", response.data.UserLogged.email);
          localStorage.setItem("id", response.data.UserLogged.id);
          localStorage.setItem(
            "fecha-creacion",
            response.data.UserLogged.created_at
          );

          localStorage.setItem("token", response.data.UserLogged.token);
          localStorage.setItem("role", response.data.UserLogged.role);
          this.$router.push("munienlinea");
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
  },
};
</script>

<style scoped>
h1 {
  color: var(--red);
  font-weight: bold;
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
  display: flex;
  margin: 10px;
  flex-flow: column wrap;
  justify-content: space-around;
  align-items: center;
  z-index: 50;
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
  background: #fff;
}

form input {
  margin: 20px;
}

form img {
  margin-bottom: 15%;
}

@media (max-width: 800px) {
  .deco {
    display: none;
  }

  form {
    width: 80%;
  }
}
</style>
