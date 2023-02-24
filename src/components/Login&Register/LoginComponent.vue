<template>
  <div class="login-container">
    <div class="deco">
      <h2>Municipalidad de campo Bravo</h2>
    </div>

    <form>
      <h1>Login de vecino</h1>
      <FormKit
        type="form"
        id="registration-example"
        :actions="false"
        incomplete-message="Aun no has completado todos los campos."
      >
        <FormKit
          v-model="this.cuil"
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
          v-model="this.password"
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
    <div class="deco">
      <h2>Muni En Linea</h2>
    </div>
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
  methods: {
    ...mapActions(["mockLogin"]),

    //Login con AXIOS, hablar con patricio para mayor cant de detalles en response.data

    log() {
      this.loading = true;
      let log = {
        password: this.password,
        cuil: this.cuil,
      };

      dbService
        .postLoginUser(log)
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
            console.log(response.data);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.user.role);
            this.$router.push("munienlinea");
            this.loading = false;
          } else {
            this.validacion = false;
            this.msj = "Usuario incorrecto";
            console.log(this.msj);
          }
        })
        .catch((error) => {
          console.log(error);
          this.validacion = false;
          this.msj = "Usuario incorrecto";
          this.loading = false;
          console.log(this.msj);
        });
    },

    // log() {
    //   if (this.validacion) {
    //     this.mockLogin();
    //     //$router.go(numero) para avanzar o retroceder en la pagina
    //     this.$router.push({
    //       path: "munienlinea",
    //       // query: {
    //       //   variable1: 1,
    //       // },
    //       replace: true,
    //     });
    //   }
    // },
  },
};
</script>

<style scoped>
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
  margin: 50px;
  justify-content: space-around;
  align-items: center;
  z-index: 50;
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

form input {
  margin: 20px;
}

form h1 {
  color: var(--red);
}
</style>
