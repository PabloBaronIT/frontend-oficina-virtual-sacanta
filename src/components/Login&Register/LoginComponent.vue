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
          validation="required|matches:/[^a-zA-Z]/"
          :validation-messages="{
            required: 'Ingresa una contraseña',
            matches: 'Incluir un simbolo',
          }"
          @keyup.enter="log"
        />
        <input
          class="btn btn-primary"
          type="button"
          value="Login"
          @click="log"
        />
      </FormKit>
      <!-- <div v-if="this.validar">
        <h2>Ingresaste correctamente</h2>
      </div> -->
      <p>{{ error }}</p>
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
      validacion: false,
      msj: "",
    };
  },
  methods: {
    ...mapActions(["mockLogin"]),

    //Login con AXIOS, hablar con patricio para mayor cant de detalles en response.data

    log() {
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
            localStorage.removeItem("name");
            localStorage.removeItem("lastname");
            localStorage.removeItem("cuil");
            localStorage.removeItem("adress");
            localStorage.removeItem("email");
            localStorage.removeItem("fecha-creacion");
            localStorage.removeItem("id");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
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
          }
        })
        .catch((error) => {
          console.log(error);
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
  computed: {
    error() {
      return this.msj;
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}

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
  z-index: 1;
  background: #fff;
}

form input {
  margin: 20px;
}
</style>
