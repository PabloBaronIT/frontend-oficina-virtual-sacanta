<template>
  <div class="register-container">
    <div class="form-container">
      <FormKit
        type="form"
        id="registration-example"
        :form-class="submitted ? 'hide' : 'show'"
        submit-label="Register"
        @submit="submitHandler"
        :actions="false"
        incomplete-message="Aun no has completado todos los campos."
      >
        <h1>Register!</h1>

        <hr />
        <FormKit
          type="text"
          name="name"
          label="Nombre"
          placeholder="Nombre"
          validation="required|length:4,15"
          :validation-messages="{
            required: 'Ingresa un nombre',
            length: 'El nombre debe tener entre 4 y 15 letras',
          }"
        />
        <FormKit
          type="text"
          name="email"
          label="Tu email"
          placeholder="ejemplo@ejemplo.com"
          validation="required|email"
          :validation-messages="{
            required: 'Ingresa tu email',
            email: 'Email invalido',
          }"
        />
        <div class="double">
          <FormKit
            type="password"
            name="password"
            label="Contraseña"
            validation="required|length:6|matches:/[^a-zA-Z]/"
            :validation-messages="{
              required: 'Ingresa una contraseña',
              matches: 'Incluir un simbolo',
            }"
            placeholder="Your password"
          />
          <FormKit
            type="password"
            name="password_confirm"
            label="Confirmar contraseña"
            placeholder="Confirmar contraseña"
            validation="required|confirm"
            :validation-messages="{
              required: 'Repite la contraseña',
              confirm: 'Las contraseñas no coinciden',
            }"
          />
        </div>

        <FormKit type="submit" label="Register" />
      </FormKit>
      <div v-if="submitted">
        <h2>Submission successful!</h2>
      </div>
    </div>
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
      confirmPassword: "",
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
  justify-content: center;
  align-items: center;
  width: 400px;
  position: relative;
  z-index: 10;
  background: #fff;
  box-shadow: 0px 0px 10px #333;
  margin: 50px;
}

.form-container {
  padding: 10px;
}
</style>
