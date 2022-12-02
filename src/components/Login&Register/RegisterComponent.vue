<template>
  <div class="register-container">
    <div class="form-container">
      <FormKit
        type="form"
        id="registration-example"
        :actions="false"
        incomplete-message="Aun no has completado todos los campos."
      >
        <h1>Registrar vecino</h1>

        <hr />
        <FormKit
          v-model="this.name"
          type="text"
          name="name"
          label="Nombre"
          placeholder="Nombre"
          validation="required|length:3,30|alpha:latin"
          :validation-messages="{
            required: 'Ingresa un nombre',
            length: 'El nombre debe tener entre 3 y 30 letras',
            alpha: 'No se admiten nùmeros ni sìmbolos',
          }"
        />
        <FormKit
          v-model="this.lastname"
          type="text"
          name="lastname"
          label="Apellido"
          placeholder="Apellido"
          validation="required|length:3,30|text|alpha:latin"
          :validation-messages="{
            required: 'Ingresa un apellido',
            length: 'El apellido debe tener entre 3 y 30 letras',
            alpha: 'No se admiten nùmeros ni sìmbolos',
          }"
        />
        <FormKit
          v-model="this.cuil"
          type="number"
          name="cuil"
          label="CUIL"
          placeholder="CUIL"
          validation="required|number|length:11,11"
          help="Ingresar solo numeros"
          :validation-messages="{
            required: 'Ingresa el CUIL sin simbolos ni espacios',
            number: 'Ingresar solo nùmeros',
            length: 'El CUIL debe tener 11 caracteres',
          }"
        />

        <FormKit
          v-model="this.email"
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
            v-model="this.password"
            type="password"
            name="password"
            label="Contraseña"
            validation="required|length:8,30|matches:/[^a-zA-Z]/"
            :validation-messages="{
              length: 'Debe ser mayor a 6 caracteres',
              required: 'Ingresa una contraseña',
              matches: 'Incluir un simbolo',
            }"
            placeholder="Your password"
          />
          <FormKit
            v-model="this.confirmPassword"
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

        <input
          class="btn btn-primary"
          type="button"
          value="Ingresar"
          @click="registrar"
        />
      </FormKit>
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
      cuil: null,
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

      dbService
        .postCreateUser(registro)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error.message);
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
