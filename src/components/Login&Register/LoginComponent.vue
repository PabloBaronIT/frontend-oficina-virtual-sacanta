<template>
  <div class="login-container">
    <div class="deco">
      <h2>Municipalidad de campo Bravo</h2>
    </div>

    <form>
      <FormKit
        type="form"
        id="registration-example"
        :actions="false"
        incomplete-message="Aun no has completado todos los campos."
      >
        <h1>Registrar vecino</h1>

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
        />
        <input
          class="btn btn-primary"
          type="button"
          value="Login"
          @click="log"
        />
      </FormKit>
      <div v-if="validar">
        <h2>Ingresaste correctamente</h2>
      </div>
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
      validacion: true,
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
          console.log("hola");
          console.log(response);
          if (response.status == 200) {
            console.log(response.headers);
            this.validacion = true;
            this.mockLogin();
            this.$router.push("munienlinea");
            localStorage.setItem("token", JSON.stringify(response));
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
