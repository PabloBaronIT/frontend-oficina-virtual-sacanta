<template>
  <div class="login-container">
    <div class="deco">
      <h2>Municipalidad de campo Bravo</h2>
    </div>

    <form>
      <FormKit
        type="form"
        id="registration-example"
        :form-class="submitted ? 'hide' : 'show'"
        submit-label="Register"
        @submit="submitHandler"
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
          validation="required|length:8,30|matches:/[^a-zA-Z]/"
          :validation-messages="{
            length: 'Debe ser mayor a 6 caracteres',
            required: 'Ingresa una contraseña',
            matches: 'Incluir un simbolo',
          }"
        />

        <FormKit type="submit" label="Register" @click="log" />
      </FormKit>
      <div v-if="submitted">
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

export default {
  name: "LoginComponent",
  data() {
    return {
      cuil: null,
      password: "",
      validar: true,
    };
  },
  methods: {
    log() {
      let log = {
        password: this.password,
        cuil: this.cuil,
      };
      console.log(log);
      dbService
        .postLoginUser(log)
        .then(function (response) {
          if (this.validar) {
            console.log("holas");
            this.mockLogin();
            console.log("ok");
            this.$router.push("/munienlinea");
          }

          console.log(response);
        })
        .catch((error) => {
          console.log("hola");
          console.log(error);
        });
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
