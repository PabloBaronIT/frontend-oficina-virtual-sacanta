<template>
  <div class="cuenta-container">
    <div v-if="this.cuil === null" class="modalCuil">
      <h2>Para poder ingresar a nuestra web, debe completar sus datos:</h2>
      <FormKit
        type="form"
        id="registration-example"
        :actions="false"
        incomplete-message="Aun no has completado todos los campos."
      >
        <div class="interno">
          <div class="row">
            <div class="col">
              <FormKit
                v-model="this.cuilUser"
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

          <div>
            <input
              class="btn btn-primary btn-lg botonSubmit"
              type="button"
              value="Registrar"
              @click.prevent="registrar"
            />
            <div class="creado" v-if="this.message">
              {{ this.message }}
            </div>
          </div>
        </div>
      </FormKit>
    </div>
    <Datos v-else />
  </div>
</template>

<script>
import Datos from "@/components/MiCuenta/DatosComponent.vue";
import setToken from "@/middlewares/setToken";
import setTokenRelations from "@/middlewares/setTokenRelations";
import axios from "axios";
import { BASE_URL } from "@/env";
export default {
  name: "CuentaView",
  components: {
    Datos,
  },
  data() {
    return {
      cuil: this.$store.state.user.cuil || null,
      //para saber si el usuario que iongreso tiene cuil o no
      message: null,
      cuilUser: "",
      postCode: "",
      adress: "",
      city: "",
      user: "",
    };
  },
  created() {},
  methods: {
    dispatchLogin() {
      this.$store.dispatch("mockLoginAction", this.user);
    },
    registrar() {
      let registro = {
        cuil: this.cuilUser,
        city: this.city,
        postCode: this.postCode,
        adress: this.adress,
      };
      console.log(registro);
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .put("/oficina/update-provider-account", registro)
        .then((response) => {
          console.log(response.data);
          this.message = response.data.message;
          this.cuilUser = "";
          this.postCode = "";
          this.adress = "";
          this.city = "";
          this.getMyProfile();
          setTimeout(() => {
            this.$router.push("/munienlinea");
          }, 2000);
        })
        .catch(function (error) {
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.registrar();
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.registrar();
            }
          }
        });
    },
    getMyProfile() {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get("/oficina/user/profile")
        .then((response) => {
          console.log(response.data, "datos de usuariodb");
          this.user = response.data.UserProfile.user;
          this.dispatchLogin();
          window.localStorage.setItem(
            "role",
            response.data.UserProfile.user.role
          );
          window.localStorage.setItem(
            "name",
            response.data.UserProfile.user.firstname
          );
          window.localStorage.setItem(
            "lastname",
            response.data.UserProfile.user.lastname
          );
          window.localStorage.setItem(
            "cuil",
            response.data.UserProfile.user.cuil
          );
          window.localStorage.setItem(
            "adress",
            response.data.UserProfile.user.adress
          );
          window.localStorage.setItem(
            "email",
            response.data.UserProfile.user.email
          );
          window.localStorage.setItem("id", response.data.UserProfile.user.id);
          window.localStorage.setItem(
            "fecha-creacion",
            response.data.UserProfile.user.created_at
          );
          window.localStorage.setItem(
            "nivel",
            response.data.UserProfile.user.level.level
          );

          // this.$router.push("munienlinea");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.getMyProfile();
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.getMyProfile();
            }
          }
        });
    },
  },
};
</script>

<style scoped>
.cuenta-container {
  position: relative;
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  background: rgb(235, 235, 235);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  padding: 30px;
}
.modalCuil {
  position: absolute;
  z-index: 10;
  height: 50vh;
  width: 90%;
  /* background: white; */
  padding: 2rem 0px;
  border-radius: 20px;
}
.creado {
  margin: auto;
  font-size: 25px;
  color: var(--green);
}
h2 {
  margin-bottom: 5rem;
}
</style>
