<template>
  <div class="login-container">
    <div class="manto"></div>
    <div class="boxIzquierdo" v-if="modalFormulario">
      <div class="boxIzquierdoTop"></div>
      <div
        style="
          position: absolute;
          top: 3vh;
          left: 2vw;
          width: 60%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        "
      >
        <div style="margin: auto">
          <svg
            width="200"
            height="67"
            viewBox="0 0 263 67"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M64.23 7.39003H66.62L69.61 15.72C69.99 16.79 70.34 17.89 70.72 18.97H70.82C71.2 17.89 71.52 16.79 71.9 15.72L74.85 7.39003H77.24V22.98H75.4V14.39C75.4 13.03 75.55 11.16 75.65 9.78001H75.56L74.32 13.34L71.38 21.41H70.07L67.12 13.34L65.88 9.78001H65.79C65.89 11.16 66.04 13.03 66.04 14.39V22.98H64.24V7.39003H64.23Z"
              fill="#1D1D1B"
            />
            <path
              d="M81.1599 18.75V11.43H83.1199V18.5C83.1199 20.65 83.7699 21.57 85.2999 21.57C86.4799 21.57 87.2999 20.99 88.3899 19.62V11.43H90.3399V22.98H88.7299L88.5599 21.17H88.4899C87.4199 22.43 86.2699 23.26 84.6799 23.26C82.2499 23.27 81.1599 21.7 81.1599 18.75Z"
              fill="#1D1D1B"
            />
            <path
              d="M94.24 11.43H95.85L96.02 13.1H96.09C97.19 12.02 98.38 11.15 99.96 11.15C102.39 11.15 103.49 12.72 103.49 15.67V22.99H101.54V15.92C101.54 13.77 100.89 12.85 99.36 12.85C98.18 12.85 97.36 13.45 96.2 14.62V22.98H94.25V11.43H94.24Z"
              fill="#1D1D1B"
            />
            <path
              d="M106.88 7.8C106.88 7.03 107.47 6.54002 108.23 6.54002C108.99 6.54002 109.58 7.04 109.58 7.8C109.58 8.54 108.99 9.06001 108.23 9.06001C107.47 9.06001 106.88 8.54 106.88 7.8ZM107.23 11.43H109.18V22.98H107.23V11.43Z"
              fill="#1D1D1B"
            />
            <path
              d="M112.22 17.22C112.22 13.37 114.82 11.15 117.78 11.15C119.3 11.15 120.35 11.78 121.16 12.51L120.16 13.8C119.49 13.19 118.78 12.78 117.87 12.78C115.78 12.78 114.24 14.58 114.24 17.23C114.24 19.88 115.69 21.65 117.81 21.65C118.87 21.65 119.8 21.14 120.52 20.5L121.37 21.81C120.33 22.73 119.02 23.28 117.64 23.28C114.56 23.27 112.22 21.05 112.22 17.22Z"
              fill="#1D1D1B"
            />
            <path
              d="M123.55 7.8C123.55 7.03 124.14 6.54002 124.9 6.54002C125.66 6.54002 126.25 7.04 126.25 7.8C126.25 8.54 125.66 9.06001 124.9 9.06001C124.14 9.06001 123.55 8.54 123.55 7.8ZM123.91 11.43H125.86V22.98H123.91V11.43Z"
              fill="#1D1D1B"
            />
            <path
              d="M129.76 11.43H131.37L131.54 12.76H131.61C132.65 11.89 133.95 11.14 135.29 11.14C138.27 11.14 139.87 13.46 139.87 17.02C139.87 20.96 137.51 23.25 134.87 23.25C133.81 23.25 132.73 22.76 131.67 21.91L131.72 23.93V27.84H129.77V11.43H129.76ZM137.84 17.05C137.84 14.5 136.97 12.79 134.8 12.79C133.82 12.79 132.84 13.33 131.71 14.37V20.42C132.76 21.3 133.76 21.62 134.52 21.62C136.43 21.62 137.84 19.9 137.84 17.05Z"
              fill="#1D1D1B"
            />
            <path
              d="M141.89 19.99C141.89 17.47 144.06 16.22 148.98 15.68C148.98 14.19 148.48 12.76 146.6 12.76C145.26 12.76 144.06 13.39 143.16 14L142.4 12.66C143.46 11.96 145.08 11.15 146.94 11.15C149.76 11.15 150.95 13.02 150.95 15.9V22.98H149.34L149.17 21.6H149.1C148 22.52 146.71 23.27 145.28 23.27C143.34 23.27 141.89 22.07 141.89 19.99ZM148.99 20.17V16.96C145.12 17.43 143.81 18.37 143.81 19.85C143.81 21.16 144.7 21.7 145.83 21.7C146.95 21.69 147.87 21.15 148.99 20.17Z"
              fill="#1D1D1B"
            />
            <path
              d="M154.58 20.66V6.05H156.53V20.8C156.53 21.4 156.79 21.63 157.08 21.63C157.19 21.63 157.29 21.63 157.51 21.58L157.77 23.07C157.49 23.17 157.16 23.25 156.64 23.25C155.18 23.27 154.58 22.33 154.58 20.66Z"
              fill="#1D1D1B"
            />
            <path
              d="M160.28 7.8C160.28 7.03 160.87 6.54002 161.63 6.54002C162.39 6.54002 162.98 7.04 162.98 7.8C162.98 8.54 162.39 9.06001 161.63 9.06001C160.87 9.06001 160.28 8.54 160.28 7.8ZM160.64 11.43H162.59V22.98H160.64V11.43Z"
              fill="#1D1D1B"
            />
            <path
              d="M165.66 17.22C165.66 13.47 168.02 11.15 170.66 11.15C172 11.15 172.88 11.66 173.9 12.49L173.82 10.51V6.06001H175.77V22.99H174.16L173.99 21.63H173.92C173.02 22.53 171.79 23.28 170.42 23.28C167.53 23.27 165.66 21.07 165.66 17.22ZM173.81 20.05V14C172.82 13.12 171.94 12.8 170.99 12.8C169.14 12.8 167.67 14.58 167.67 17.21C167.67 19.98 168.82 21.63 170.84 21.63C171.92 21.62 172.84 21.1 173.81 20.05Z"
              fill="#1D1D1B"
            />
            <path
              d="M178.95 19.99C178.95 17.47 181.12 16.22 186.04 15.68C186.04 14.19 185.54 12.76 183.66 12.76C182.32 12.76 181.12 13.39 180.22 14L179.46 12.66C180.52 11.96 182.14 11.15 184 11.15C186.82 11.15 188.01 13.02 188.01 15.9V22.98H186.4L186.23 21.6H186.16C185.06 22.52 183.77 23.27 182.34 23.27C180.4 23.27 178.95 22.07 178.95 19.99ZM186.05 20.17V16.96C182.18 17.43 180.87 18.37 180.87 19.85C180.87 21.16 181.76 21.7 182.89 21.7C184.01 21.69 184.93 21.15 186.05 20.17Z"
              fill="#1D1D1B"
            />
            <path
              d="M190.82 17.22C190.82 13.47 193.18 11.15 195.82 11.15C197.16 11.15 198.04 11.66 199.06 12.49L198.98 10.51V6.06001H200.93V22.99H199.32L199.15 21.63H199.08C198.18 22.53 196.95 23.28 195.58 23.28C192.69 23.27 190.82 21.07 190.82 17.22ZM198.97 20.05V14C197.98 13.12 197.1 12.8 196.15 12.8C194.3 12.8 192.83 14.58 192.83 17.21C192.83 19.98 193.98 21.63 196 21.63C197.08 21.62 198 21.1 198.97 20.05Z"
              fill="#1D1D1B"
            />
            <path
              d="M208.75 17.22C208.75 13.47 211.11 11.15 213.75 11.15C215.09 11.15 215.97 11.66 216.99 12.49L216.91 10.51V6.06001H218.86V22.99H217.25L217.08 21.63H217.01C216.11 22.53 214.88 23.28 213.51 23.28C210.62 23.27 208.75 21.07 208.75 17.22ZM216.9 20.05V14C215.91 13.12 215.03 12.8 214.08 12.8C212.23 12.8 210.76 14.58 210.76 17.21C210.76 19.98 211.91 21.63 213.93 21.63C215.01 21.62 215.94 21.1 216.9 20.05Z"
              fill="#1D1D1B"
            />
            <path
              d="M221.9 17.22C221.9 13.46 224.43 11.15 227.09 11.15C230.04 11.15 231.7 13.27 231.7 16.57C231.7 16.98 231.66 17.4 231.61 17.68H223.83C223.97 20.13 225.47 21.71 227.67 21.71C228.78 21.71 229.69 21.35 230.54 20.79L231.24 22.07C230.23 22.73 229 23.27 227.43 23.27C224.35 23.27 221.9 21.02 221.9 17.22ZM229.98 16.28C229.98 13.97 228.94 12.71 227.13 12.71C225.51 12.71 224.05 14.01 223.82 16.28H229.98Z"
              fill="#1D1D1B"
            />
            <path
              d="M63.83 59.88L68.03 54.86C70.33 56.86 73.32 58.24 75.98 58.24C79.04 58.24 80.53 57.04 80.53 55.12C80.53 53.08 78.69 52.43 75.86 51.27L71.65 49.48C68.3 48.12 65.12 45.36 65.12 40.66C65.12 35.3 69.91 31.01 76.65 31.01C80.38 31.01 84.27 32.48 87.06 35.25L83.37 39.86C81.24 38.22 79.21 37.32 76.65 37.32C74.13 37.32 72.52 38.37 72.52 40.22C72.52 42.2 74.64 42.93 77.46 44.05L81.58 45.72C85.53 47.32 88 49.95 88 54.53C88 59.91 83.52 64.56 75.81 64.56C71.6 64.56 67.13 62.97 63.83 59.88Z"
              fill="#1D1D1B"
            />
            <path
              d="M99.56 31.6H108.32L118.48 63.97H110.74L106.51 47.58C105.61 44.34 104.75 40.52 103.88 37.14H103.68C102.9 40.56 102.03 44.34 101.13 47.58L96.88 63.97H89.4L99.56 31.6ZM96.1 50.57H111.67V56.26H96.1V50.57Z"
              fill="#1D1D1B"
            />
            <path
              d="M119.97 47.97C119.97 37.23 127.07 31 135.25 31C139.43 31 142.8 32.97 144.98 35.2L141.12 39.89C139.49 38.38 137.75 37.31 135.41 37.31C130.97 37.31 127.47 41.22 127.47 47.71C127.47 54.36 130.57 58.23 135.3 58.23C137.96 58.23 140.05 56.92 141.63 55.2L145.49 59.79C142.8 62.92 139.23 64.54 135.04 64.54C126.83 64.56 119.97 58.87 119.97 47.97Z"
              fill="#1D1D1B"
            />
            <path
              d="M156.43 31.6H165.19L175.35 63.97H167.61L163.38 47.58C162.48 44.34 161.62 40.52 160.75 37.14H160.55C159.77 40.56 158.9 44.34 158 47.58L153.75 63.97H146.27L156.43 31.6ZM152.97 50.57H168.54V56.26H152.97V50.57Z"
              fill="#1D1D1B"
            />
            <path
              d="M178.48 31.6H185.98L194.43 47.7L197.63 54.81H197.83C197.49 51.39 196.89 46.85 196.89 43.04V31.6H203.86V63.97H196.36L187.92 47.83L184.72 40.76H184.52C184.86 44.33 185.46 48.67 185.46 52.48V63.97H178.49V31.6H178.48Z"
              fill="#1D1D1B"
            />
            <path
              d="M217.84 37.74H208.93V31.6H234.07V37.74H225.16V63.97H217.84V37.74Z"
              fill="#1D1D1B"
            />
            <path
              d="M243.16 31.6H251.92L262.08 63.97H254.34L250.11 47.58C249.21 44.34 248.35 40.52 247.48 37.14H247.28C246.5 40.56 245.63 44.34 244.73 47.58L240.48 63.97H233L243.16 31.6ZM239.7 50.57H255.27V56.26H239.7V50.57Z"
              fill="#1D1D1B"
            />
            <path
              d="M20.62 5.60002C20.62 2.51002 23.13 1.52588e-05 26.22 1.52588e-05C29.31 1.52588e-05 31.82 2.51002 31.82 5.60002C31.82 8.69002 29.31 11.2 26.22 11.2C23.12 11.2 20.62 8.69002 20.62 5.60002Z"
              fill="#3DA936"
            />
            <path
              d="M26.27 60.04C15.2 58.55 6.29 49.62 4.82 38.55C3.73 30.38 6.57 22.86 11.71 17.57C4.23 22.84 -0.430008 31.82 0.449992 41.84C1.56999 54.58 11.92 64.93 24.65 66.05C39.07 67.32 51.33 57.14 53.46 43.59C49.59 54.34 38.68 61.71 26.27 60.04Z"
              fill="#0F539E"
            />
            <path
              d="M14.41 35.31C15.62 26.34 22.86 19.12 31.83 17.92C38.45 17.04 44.55 19.34 48.84 23.5C44.57 17.44 37.29 13.65 29.16 14.37C18.84 15.28 10.44 23.67 9.53004 33.99C8.50004 45.68 16.76 55.62 27.74 57.34C19.04 54.22 13.05 45.37 14.41 35.31Z"
              fill="#3DA936"
            />
            <path
              d="M26.31 27.69C31.9 23.53 39.77 23.62 45.26 27.91C49.31 31.08 51.33 35.68 51.34 40.28C52.38 34.67 50.54 28.62 45.77 24.54C39.71 19.35 30.58 19.24 24.41 24.3C17.42 30.02 16.4 39.92 21.36 46.89C18.4 40.41 20.05 32.36 26.31 27.69Z"
              fill="#E63D21"
            />
          </svg>
        </div>
        <img src="./../../../images/MuniEnLinea.svg" alt="" class="logo" />
      </div>
      <img src="./../../assets/HombreLogin.svg" alt="" class="hombreLogin" />

      <div class="boxIzquierdoBotton"></div>
      <div class="internoIzquierdo">
        <h2><strong>BIENVENIDO</strong></h2>
        <h3>Estás en el acceso a la oficina Virtual Municipal.</h3>
        <h3 style="font-weight: lighter; font-size: x-large; margin-top: 1rem">
          Presenta aqui todos tus trámites y gestiones de manera rapida y
          simple, sin horarios y de desde el lugar que vos elijas.
        </h3>
      </div>
    </div>
    <!---------------->
    <div style="position: absolute; right: 2vw" v-if="modalFormulario">
      <div class="boxDerecho"></div>
      <div class="internoBox">
        <h4 style="opacity: 1"><strong>Ingresá con</strong></h4>
        <button class="btn btn-outline-secondary botonCidi">
          <a href="https://cidi.test.cba.gov.ar/Cuenta/Login?app=551"
            ><img src="./../../../images/logo_ciudig28.png" alt="imagin cidi"
          /></a>
        </button>
        <h5>Accedé a todos los trámites y servicios</h5>
        <div class="linea"></div>
        <h5>También podés acceder sin usuario de CIDI</h5>
        <div
          class="botonServicios"
          @click="() => (this.modalFormulario = false)"
        >
          <svg
            width="62"
            height="62"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="svgCirculo"
          >
            <g id="Group">
              <path
                id="Vector"
                d="M47.8518 47.8196C56.537 39.1344 56.537 25.053 47.8518 16.3678C39.1666 7.6826 25.0851 7.68255 16.4 16.3677C7.71479 25.0529 7.71484 39.1344 16.4 47.8196C25.0852 56.5047 39.1666 56.5047 47.8518 47.8196Z"
                fill="#008938"
                stroke="#008938"
                stroke-width="0.4168"
                stroke-miterlimit="10"
              />
              <path
                id="Vector_2"
                d="M25.75 28.96C25.53 28.45 25.1 27.26 25.16 25.71C25.19 25.1 25.3 23.14 26.73 21.4C28.72 18.98 31.65 18.92 32.08 18.91C32.54 18.91 35.31 18.94 37.33 21.2C38.91 22.97 39.05 25.02 39.1 25.77C39.14 26.43 39.19 27.72 38.51 29.15C38 30.21 37.3 30.89 36.86 31.26C37.34 31.52 38.01 31.92 38.71 32.53C39.41 33.15 40.57 34.36 41.26 36.19C41.68 37.3 41.74 38.15 41.85 39.68C41.94 41.04 41.98 42.94 41.7 45.25C35.29 45.25 28.88 45.25 22.46 45.25C22.3 42.83 22.36 40.85 22.46 39.43C22.58 37.8 22.72 37.17 22.89 36.63C23.54 34.59 24.75 33.28 25.27 32.77C26.02 32.03 26.7601 31.55 27.3001 31.25C26.8701 30.83 26.22 30.07 25.75 28.96Z"
                stroke="#EDEDED"
                stroke-width="0.955"
                stroke-miterlimit="10"
              />
            </g>
          </svg>
          <p>Accedé con servicios limitados</p>
        </div>
      </div>
    </div>
    <!-- MODAL DE FACE-GOOGLE-USUARIO Y CONTRASEÑA -->
    <div class="modalFormulario" v-else>
      <div @click="() => (this.modalFormulario = true)">x</div>
      <form>
        <!-- <img
        class="w-50"
        src="https://github.com/PabloBaronIT/frontend-oficina-virtual/blob/main/src/assets/muni-en-linea-logo.png?raw=true"
        alt=""
      /> -->

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
          />
          <p class="error">{{ this.msj }}</p>
        </FormKit>

        <div class="botones">
          <button type="button" class="btn btn-outline-secondary" @click="log">
            Ingresar
          </button>
          <button type="button" class="btn btn-outline-secondary">
            <router-link to="/crear-cuenta"> Crear cuenta </router-link>
          </button>
          <button class="btn btn-outline-secondary boton">
            <img src="./../../../images/logo_ciudig28.png" alt="imagin cidi" />
            <div class="representaCD">
              <a
                href="https://cidi.test.cba.gov.ar/Cuenta/Login?app=551"
                class="nombreCD"
                >iniciar sesion</a
              >
            </div>
          </button>
          <GoogleLogin :callback="callback" prompt style="width: 100%" />
          <button class="button face" @click="logInWithFacebook">
            <i class="bi bi-facebook" style="font-size: 25px"></i>
            Continuar con Facebook
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- <div v-if="this.loading" class="spinner-border loading" role="status">
      <span class="sr-only"></span>
    </div> -->
</template>

<script>
import axios from "axios";
import dbService from "@/services/dbService";
import setToken from "@/middlewares/setToken";
import setTokenRelations from "@/middlewares/setTokenRelations";
import { BASE_URL } from "@/env";
import { decodeCredential } from "vue3-google-login";
// import { resolve } from "chart.js/dist/helpers/helpers.options";
//Duracion e sesiones de usuario (charlar con patricio)
//Recordar sesion mediante cookies => Ver libreria js-cookie
//

export default {
  name: "LoginComponent",

  data() {
    return {
      face: null,
      cuil: null,
      password: "",
      validacion: false,
      msj: "",
      loading: false,
      user: null,
      representante: null,
      cidiCookie: null,
      datos: null,
      habilitado: null,
      callback: async (response) => {
        // This callback will be triggered when the user selects or login to
        // his Google account from the popup
        event.preventDefault();
        this.loading = true;
        let userData = decodeCredential(response.credential);
        console.log("respuesta de google", userData);
        const apiClient = axios.create({
          baseURL: BASE_URL,
          withCredentials: false,
          headers: {
            "auth-header": localStorage.getItem("token"),
          },
        });
        apiClient
          .post("/auth/signIn-providers", {
            firstname: userData.given_name,
            lastname: userData.family_name,
            email: userData.email,
          })
          .then((response) => {
            console.log(response.data);

            let tokenApi = response.data.accessToken;
            let refreshToken = response.data.refreshToken; //REFRESH TOKEN
            let redirect = response.data["redirectURL"];
            localStorage.setItem("token", tokenApi);
            localStorage.setItem("refreshToken", refreshToken);
            this.getMyProfile();
            if (redirect) {
              //console.log("usted debe rellenar su cuil");
              this.loading = false;

              this.$router.push("micuenta-update");
            } else {
              // this.loading = true;
              // this.getMyProfile();
              this.loading = false;

              this.$router.push("munienlinea");
            }
          })
          .catch((error) => {
            this.loading = false;
            this.msj = error.response.data.message;

            console.log(error.data);
          });
      },

      datafacebook: "",
      modalFormulario: true,
    };
  },

  beforeRouteLeave(to, from, next) {
    localStorage.clear();
    next();
  },
  beforeRouteEnter(to, from, next) {
    localStorage.clear();
    next();
  },
  created() {
    //tomo del la ruta la query string para tomar datos del usuario
    localStorage.clear();

    let cidi = this.$route.query.cidi || null;
    console.log(cidi, "soy query de cidi");

    let Cookiess = document.cookie.split(";"); //tomo todas la cookkies
    let asd = Cookiess?.map((element) => {
      //las recorro para buscar la de cidi
      if (element.includes("cidi")) return element;
    });
    let cidiCook = asd[0]?.split("=") || null; //separo la que es de cidi para obtener el valor

    if (cidi) {
      this.loading = true;
      this.cidiCookie = cidi;

      document.cookie = `cidi=${cidi};max-age=120`;
      //se llama la api de cidi para saber si tienen representados o no
      this.logCidi(cidi);
    }
    if (cidiCook) {
      this.cidiCookie = cidiCook[1];

      this.loading = true;
      this.logCidi(cidiCook[1]);
    }
  },
  computed: {
    setPermission() {
      if (this.$store.state.loggedIn === true) {
        return true;
      } else {
        return false;
      }
    },
  },
  watch: {
    datafacebook(newValue) {
      if (newValue) {
        this.getLogFace(newValue);
      }
    },
  },
  methods: {
    //LOGIN CON  GOOGLE O FACEBOOCK
    async logInWithFacebook() {
      await this.loadFacebookSDK(document, "script", "facebook-jssdk");
      await this.initFacebook();

      window.FB.login(
        (response) => {
          // console.log(response);

          if (response.status == "connected") {
            // window.FB.api("/me?fields=email,name", (response) => {
            //   console.log(response);
            // });
            window.FB.api(
              "/me",
              "GET",
              { fields: "id,name, email" },
              (response) => {
                console.log(response);
                this.datafacebook = {
                  name: response.name.split(" "),
                  email: response.email,
                };
                console.log(
                  this.datafacebook,
                  "soy los datos de face en un estado"
                );
                // await this.getLogFace(this.datafacebook);
                // dataUser = {
                //   name: response.name.split(" "),
                //   email: response.email,
                // };
              }
            );
            // console.log("otro afuera");
            // Now you can redirect the user or do an AJAX request to
            // a PHP script that grabs the signed request from the cookie.
          }
        },
        { scope: "public_profile,email" }
      );
    },
    getLogFace(userData) {
      console.log("estoy en getlogface");
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        // headers: {
        //   "auth-header": localStorage.getItem("token"),
        // },
      });
      apiClient
        .post("/auth/signIn-providers", {
          firstname: userData.name[0],
          lastname: userData.name[1],
          email: userData.email,
        })
        .then((response) => {
          console.log(response.data);

          let tokenApi = response.data.accessToken;
          let refreshToken = response.data.refreshToken; //REFRESH TOKEN
          let redirect = response.data["redirectURL"];
          localStorage.setItem("token", tokenApi);
          localStorage.setItem("refreshToken", refreshToken);
          this.getMyProfile();
          if (redirect) {
            //console.log("usted debe rellenar su cuil");
            this.loading = false;

            this.$router.push("micuenta-update");
          } else {
            // this.loading = true;
            // this.getMyProfile();
            this.loading = false;

            this.$router.push("munienlinea");
          }
        })
        .catch((error) => {
          this.loading = false;
          this.msj = error.response.data.message;

          console.log(error.data);
        });
    },
    async initFacebook() {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: "1235789680464916", //You will need to change this
          cookie: true, // This is important, it's not enabled by default
          version: "v17.0",
        });
      };
    },
    async loadFacebookSDK(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    },

    //SE GUARDA EN EL STORE EL USUARIO
    dispatchLogin() {
      this.$store.dispatch("mockLoginAction", this.user);
    },
    dispatchCidi() {
      this.$store.dispatch("mockCidiAction", this.cidiCookie);
    },
    dispatchLoginPermission() {
      this.$store.dispatch("mockPaseAction");
    },

    //se guarda los datos del representante
    dispatchRepresentante() {
      this.$store.dispatch("mockRepresentanteAction", this.representante);
    },
    //LOGIN COMUN
    log() {
      this.loading = true;
      let asd = { cuil: this.cuil, password: this.password };
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .post("/auth/signin", asd)

        .then((response) => {
          console.log(response.data);
          // let tokenApi = response.data.Token.token;
          let tokenApi = response.data.Tokens.authToken;
          let refreshToken = response.data.Tokens.refreshToken; //REFRESH TOKEN
          localStorage.setItem("token", tokenApi);
          localStorage.setItem("refreshToken", refreshToken);
          this.getMyProfile();
          // this.loading = false;
          this.$router.push("munienlinea");
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
          this.validacion = false;
          this.msj = error.response.data.message;
        });

      // this.$router.push("munienlinea");
    },
    /* ESTE METODO LE ENVIA A LA API DE CIDI LAS HASCOOKIE PARA OBTENER TODOS LOS DATOS Y REPSRESENTADO*/
    logCidi(cidi) {
      this.dispatchCidi();
      //console.log(this.cidiCookie, "cidicookie");
      console.log("entre en el logcidi");
      //SE ENVIA LA QUERY PARA OBTENER TODA LA INFO DEL USUARIO
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        // headers: {
        //   "auth-header": localStorage.getItem("token"),
        // },
      });
      apiClient
        .post("/auth/cidi/login/" + cidi)

        .then((response) => {
          console.log(response.data, "respuesta api cidi");
          console.log("no hay respuesta de cidi");
          let token = response.data["Tokens"] || null; //token por calve fizcal o sin representados
          let redireccionamiento = response.data["redirectURL"] || null; //redireccionamiento con representados
          let tokenRepresetations =
            response.data["TokenRepresentations"] || null; //token con representados

          if (token) {
            localStorage.setItem("token", token.authToken);
            localStorage.setItem("refreshToken", token.refreshToken);

            this.getMyProfile();
            this.$router.push("munienlinea");
          }

          //si tiene representados
          if (redireccionamiento) {
            window.location.href = response.data.redirectURL;
          }
          if (tokenRepresetations) {
            localStorage.setItem("token", tokenRepresetations.authToken);
            localStorage.setItem(
              "refreshToken",
              tokenRepresetations.refreshToken
            );

            //se buscan los datos del usuario
            let payload = dbService.getToken(tokenRepresetations.authToken);
            let idRepresentante = payload.representative;
            localStorage.setItem("idRepresentante", idRepresentante);
            this.getMyProfile();
            //se busca los datos del representante
            this.getRepresentante(idRepresentante);
            this.$router.push("munienlinea");
          }
        })
        .catch((error) => {
          console.log(error);
          this.msj = "Usuario incorrecto";
          this.loading = false;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    //FUNCION PARA OBTENER EL PERFIL DEL USUARIO
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
          this.user.cidiCookie = this.cidiCookie;
          this.dispatchLogin();
          this.dispatchLoginPermission();
          window.localStorage.setItem(
            "role",
            response.data.UserProfile.user.role || null
          );
          window.localStorage.setItem(
            "name",
            response.data.UserProfile.user.firstname || null
          );
          window.localStorage.setItem(
            "lastname",
            response.data.UserProfile.user.lastname || null
          );
          window.localStorage.setItem(
            "cuil",
            response.data.UserProfile.user.cuil || null
          );
          window.localStorage.setItem(
            "adress",
            response.data.UserProfile.user.adress || null
          );
          window.localStorage.setItem(
            "email",
            response.data.UserProfile.user.email || null
          );
          window.localStorage.setItem(
            "id",
            response.data.UserProfile.user.id || null
          );
          window.localStorage.setItem(
            "fecha-creacion",
            response.data.UserProfile.user.created_at || null
          );
          window.localStorage.setItem(
            "nivel",
            response.data.UserProfile.user.level.level || null
          );
          // this.loading = false;
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
    getRepresentante(id) {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
          "access-user-header":
            "^Yh19S&^8$yl01&Fagyg8eLxrI8uxypiCpdUdRscjF!xKSSqq",
        },
      });
      apiClient
        .get("/oficina/users/" + id)
        .then((response) => {
          console.log(response.data, "datos representante");

          this.representante = response.data.User;
          localStorage.setItem(
            "representanteFirstname",
            response.data.User.firstname
          );
          localStorage.setItem(
            "representanteLastname",
            response.data.User.lastname
          );

          this.dispatchRepresentante();
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.getRepresentante(id);
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.getRepresentante(id);
            }
          }
        });
    },
  },
};
</script>

<style scoped>
.representaCD {
  line-height: 17px;
  font-size: 11px;
  color: #000;
  float: left;
  margin-top: 4px;
  margin-left: 8px;
  padding-left: 8px;
  border-left: 1px solid #e4b254;
}

.representaCD img {
  padding: 0 0 0 0;
  margin: 0 3px 0 2px;
  float: none;
  vertical-align: top;
}
.botonCidi img {
  /* padding: 0 0 0 0; */
  /* margin: 0 6px 0 0; */
  /* float: left; */
  height: 80%;
  width: 90%;
}
/* .nombreCD {
  line-height: 17px;
  font-size: 12px;
  color: #000;
  float: left;
  margin-top: 6px;
} */
.botones {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 12rem;
  width: 45%;
  margin: auto;
  margin-top: 1rem;
}
.botonCidi {
  width: 14vw;
  height: 9vh;
  background: white;
  border-radius: 20px;
  margin-bottom: 3vh;
}
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
  font-size: 13px;
  width: 200px;
}

.log-btn {
  background: var(--red);
}

.deco {
  text-align: center;
  width: 200px;
  z-index: 1;
}
.manto {
  position: absolute;
  top: 0;
  width: 140vw;
  height: 130vh;
  background: white;
  opacity: 0.2;
  margin-top: -14vh;
}
.login-container {
  width: 140vw;
  height: 130vh;
  background-image: url("../../assets/FondoMuni.png");
  background-repeat: no-repeat;
  background-size: auto;
  /* z-index: 50; */
  display: flex;
  flex-direction: row;
  margin-top: -14vh;
  /* margin: 10px; */
  /* margin-top: 2rem; */
  /* flex-flow: column wrap; */
  /* justify-content: space-around; */
  /* align-items: center; */
  /* z-index: -15; */
  /* opacity: 0.8; */
}
.boxIzquierdo {
  position: relative;
  width: 47vw;
  height: 62vh;
  border-radius: 10px 10px 0px 0px;
  position: absolute;
  top: 10vh;
  margin-left: 176px;
}
.boxIzquierdoTop {
  height: 18vh;
  width: 100%;
  background: white;
  opacity: 0.8;
  border-radius: 20px 20px 0px 0px;
}
.logo {
  width: 9vw;
  height: 7.6vh;
  opacity: 1;
  margin: auto;
}
.hombreLogin {
  position: absolute;
  width: 13vw;
  height: 26vh;
  right: 1vw;
  top: 6.5vh;
  z-index: 15;
}
.boxIzquierdoBotton {
  height: 43vh;
  width: 47vw;
  /* top: 3vh; */
  border-radius: 20px 20px 0px 0px;
  background-color: black;
  opacity: 0.6;
  z-index: 1;
  position: absolute;
  bottom: 0;
}

h3,
h4,
h5,
p {
  color: white;
}
h3 {
  font-size: 25px;
}
h3 {
  font-weight: 600;
}
p {
  font-weight: 100;
}
.internoBox {
  /* padding: 2vw; */
  right: 9vw;
  top: 24vh;
  height: 50vh;
  width: 27vw;
  position: absolute;
  z-index: 25;
  padding-top: 7vh;
  /* padding-left: 2vw; */
  text-align: center;
}
.internoIzquierdo {
  position: absolute;
  z-index: 25;
  padding-top: 12vh;
  padding-left: 3vw;
  padding-right: 2vw;
}
.boxDerecho {
  height: 62vh;
  width: 27vw;
  border-radius: 0px 20px 0px 0px;
  background: black;
  opacity: 0.6;
  z-index: 1;
  position: absolute;
  right: 9vw;
  top: 24vh;
  text-align: center;
}
.linea {
  background: white;
  height: 1px;
  width: 22.5vw;
  margin: auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.botonServicios {
  position: relative;
  height: 7vh;
  width: 16vw;
  background: white;
  border-radius: 10px;
  margin: auto;
  padding-top: 2vh;
  padding-right: 1.2vw;
  text-align: right;
}
.botonServicios p {
  color: #000;
  /* font-size: 15px; */
}
.svgCirculo {
  position: absolute;
  margin-top: -1.8vh;
  left: 0;
}
/*
form {
  width: 40vw;
  box-shadow: 0px 0px 10px #333;
  display: flex;
  align-items: center;
  justify-content: baseline;
  flex-flow: column wrap;
  position: relative;
  padding: 2rem;
  z-index: 1;
  background: #ffffff9a;
  border-radius: 1rem;
} */

/* form input {
  margin: 20px;
} */
/*
form img {
  margin-bottom: 15%;
} */
.modalFormulario {
  position: absolute;
  width: 50vw;
  height: 50vh;
  background-color: white;
  top: 20vh;
  right: 25vw;
  z-index: 17;
}
.face {
  background: #5890ff;
  color: white;
  border-radius: 5px;
  border-color: transparent;
  height: 40px;
  text-align: center;
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
<!--


 created() {
    //LOGUIN A TRAVES DE CIDI!
     let variableCidi = this.$route.query ? this.$route.query.cidi : null; //SE TOMA LA QUERY STRING DE CIDI
    let cookieCidi = document.cookie?.split(";"); //SI EXISTE UNA COOKIE SE LEE
    let element = null;
    let asd = null;
    //buscar cookie y tomar su valor
    if (cookieCidi) {
      for (let i = 0; i < cookieCidi.length; i++) {
        if (cookieCidi[i].includes("cidiHash")) {
          element = cookieCidi[i];
        }
      }
      asd = element?.split("=");
    }
    //SI VIENE POR URL LA HAS COOKIE CON ESE DATO SE LLAMA LA API DE CIDI PARA OBTENER SUS DATOS
    if (variableCidi) {
      console.log(variableCidi, "hasCokkieCidi");
      //SE TOMA LA QUERY
      //let cidi = this.$route.query?.cidi;
      document.cookie = `cidiHash= ${variableCidi};max-age=120`; //se define una cookie

      this.logCidi(variableCidi);
      variableCidi = null;
    }
    //SI YA INGRESO ANTERIORMENTE SE BUSCA LA COOKIE CON EL VALOR CIDIHAS PARA VOLVER A LLAMAR LA API DE CIDI PARA OBTENRE SU REPRESENTADO
    else if (!variableCidi && asd) {
      console.log(asd, "cookie");
      this.logCidi(asd[1]);
    } else {
      console.log("no hay query string ni cookie");
    }

    localStorage.clear();
  },


-->
