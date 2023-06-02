<template>
  <div>
    <FormKit
      type="form"
      id="registration-example"
      :actions="false"
      incomplete-message="Aun no has completado todos los campos."
    >
      <div class="container">
        <div class="row">
          <div class="col">
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
          </div>
          <div class="col">
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
          </div>
        </div>
        <div class="row">
          <div class="col">
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
          </div>
          <div class="col">
            <FormKit
              v-model="this.postCode"
              type="number"
              name="postCode"
              label="Codigo Postal"
              placeholder="Codigo Postal"
              validation="required|number|length:4,4"
              help="Ingresar solo numeros"
              :validation-messages="{
                required: 'Ingresa codigo postal sin simbolos ni espacios',
                number: 'Ingresar solo nùmeros',
                length: 'El Código Postal debe tener 4 caracteres',
              }"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <FormKit
              v-model="this.adress"
              type="text"
              name="adress"
              label="Direccion"
              placeholder="Direccion"
              validation="required|length:3,30"
              :validation-messages="{
                required: 'Ingresa una dirección',
                length: 'Debe tener entre 3 a 30 caracteres',
              }"
            />
          </div>
          <div class="col">
            <FormKit
              v-model="this.city"
              type="text"
              name="city"
              label="Ciudad"
              placeholder="Ciudad"
              validation="required|length:3,30"
              :validation-messages="{
                required: 'Ingresa una Ciudad',
                length: 'Debe tener entre 3 a 30 caracteres',
              }"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <select
              @change="isPerson($event)"
              name=""
              id=""
              class="form-select"
              aria-label="Default select example"
            >
              <option selected>soy...</option>
              <option value="1">Persona Fisica</option>
              <option value="0">Persona Juridica</option>
            </select>
          </div>
          <div class="col">
            <FormKit
              v-model="this.email"
              type="email"
              name="email"
              label="Tu email"
              placeholder="ejemplo@ejemplo.com"
              validation="required|email"
              :validation-messages="{
                required: 'Ingresa tu email',
                email: 'Email invalido',
              }"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <FormKit
              v-model="this.password"
              type="password"
              name="password"
              label="Contraseña"
              validation="required|length:8,30"
              :validation-messages="{
                length: 'Debe ser mayor a 8 caracteres',
                required: 'Ingresa una contraseña',
              }"
              placeholder="Your password"
            />
          </div>
          <div class="col">
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
        </div>
      </div>

      <div class="double">
        <!-- matches: 'Incluir un simbolo',|matches:/[^a-zA-Z]/ -->
      </div>

      <input
        class="btn btn-primary"
        type="button"
        value="Ingresar"
        @click="registrar"
      />
    </FormKit>
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
      cuil: null,
      confirmPassword: "",
      adress: "",
      iSperson: null,
      city: "",
      postCode: "",
    };
  },
  methods: {
    //ToDo:
    //Implementar Try Catch
    //Inverstigar funciones de $router (Ej: Historial de navegacion)
    //@submit.prevent="login"
    // <p v-if="error" class="error">
    isPerson($event) {
      if ($event.target.value === "0") {
        this.isPerson = false;
      } else {
        this.isPerson = true;
      }
    },
    registrar() {
      let registro = {
        name: this.name,
        lastname: this.lastname,
        password: this.password,
        email: this.email,
        cuil: this.cuil,
        adress: this.adress,
        isPerson: this.isPerson,
        city: this.city,
        postCode: this.postCode,
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
  width: 60vw;
  position: relative;
  background: #fff;
  box-shadow: 0px 0px 10px #333;
  margin: auto;
  padding: 2rem;
}

select option:hover {
  background: var(--green);
  outline: none;
  border: none;
}
</style>
