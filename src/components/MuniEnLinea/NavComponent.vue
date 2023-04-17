<template>
  <!-- Sidebar -->
  <div class="nav-container">
    <router-link to="/munienlinea">
      <img
        class="logo scale-up-center"
        src="https://github.com/PabloBaronIT/frontend-oficina-virtual/blob/main/src/assets/muni-en-linea-logo.png?raw=true"
        alt=""
      />
    </router-link>

    <div class="usuario">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="86"
        height="86"
        fill="currentColor"
        class="bi bi-person-circle scale-up-center"
        viewBox="0 0 16 16"
      >
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
        <path
          fill-rule="evenodd"
          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
        />
      </svg>
      <div class="usuario-details" v-if="this.$store.state.user">
        <div class="datos">
          <router-link v-show="permission" :to="`/micuenta`">
            Mi cuenta
          </router-link>
          <!-- <router-link v-show="permission" :to="`/comunicaciones`"> -->
          <!-- <a href=""> -->
          <img
            class="svg"
            src="@/assets/comunicacion.svg"
            alt="comunicaciones"
          />
          <!-- </a> -->
          <!-- </router-link> -->
        </div>
        <strong>
          {{ $store.state.user.firstname }},<br />
          {{ $store.state.user.lastname }}<br />
        </strong>
        <p>CUIL: {{ $store.state.user.cuil }}</p>
        <p
          v-if="this.$store.state.RepresentativeUser"
          @click="changeRepresentative"
        >
          Representado por:
          <br />
          <strong class="nameRepresntative">
            {{ $store.state.RepresentativeUser.firstname }}
            {{ $store.state.RepresentativeUser.lastname }}
          </strong>
        </p>
      </div>
    </div>
    <!-- nav del usuario -->

    <nav
      v-if="this.role !== 'MUNI_ROLE'"
      id="sidebarMenu"
      class="btn-container scale-up-center"
    >
      <!--el los usuarios que tienen representados ,el linck de inicio no se muestra hasta que seleccionar a quien representar-->
      <router-link
        v-show="permission"
        :to="`/munienlinea`"
        class="bn3"
        v-if="!$store.state.representative"
      >
        Inicio
      </router-link>
      <router-link v-show="permission" :to="`/tramites`" class="bn3">
        Mis tramites
      </router-link>

      <!--este link solo se puede acceder en el propio perfil , no como representante-->
      <router-link
        v-show="permission"
        :to="`/representaciones`"
        v-if="!$store.state.RepresentativeUser"
        class="bn3"
      >
        Mis representaciones
      </router-link>

      <input @click="logOf" class="bn3" type="button" value="Cerrar Sesion" />
    </nav>
    <!-- nav del mmunicipal -->
    <nav v-if="this.role == 'MUNI_ROLE'" id="sidebarMenu" class="btn-container">
      <router-link v-show="permission" :to="`/muni`" class="bn3">
        Back
      </router-link>

      <input @click="logOf" class="bn3" type="button" value="Cerrar Sesion" />
    </nav>
  </div>
</template>

<script>
//import dbService from "@/services/dbService";
import axios from "axios";

export default {
  name: "NavComponent",
  data() {
    return {
      ruta: this.$router.currentRoute.value.fullPath,
      usuario: localStorage.getItem("name"),
      apellido: localStorage.getItem("lastname"),
      dni: localStorage.getItem("cuil"),
      permission: true,
      user_id: localStorage.getItem("id"),
      role: localStorage.getItem("role"),
      user: null,
    };
  },
  created() {
    this.role = localStorage.getItem("role");
  },
  watch: {},

  methods: {
    logOf() {
      localStorage.clear();
      location.reload();
      this.$router.push("login");
      window.dispatchEvent(
        new CustomEvent("token-localstorage-changed", {
          detail: {
            storage: localStorage.getItem("token"),
          },
        })
      );
    },
    dispatchRepresentative() {
      this.$store.dispatch("setRepresentativeAction");
    },
    dispatchProfile() {
      this.$store.dispatch("getProfileAction", this.user);
    },
    dispatchClearRepresentativeUser() {
      this.$store.dispatch("clearRepresentativeUserAction");
    },
    changeRepresentative() {
      console.log("cambiew");
      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("tokenCopia"),
        },
      });
      apiClient
        .post("/representations/choose-representation", {
          representativeId: this.$store.state.RepresentativeUser.id,
        })
        .then((response) => {
          console.log(response.data.message);
          window.localStorage.removeItem("token");
          window.localStorage.setItem("token", response.data.token);
          this.getProfile();
          setTimeout(() => this.$router.push("munienlinea"), 2000);
          this.dispatchClearRepresentativeUser();
          //this.dispatchRepresentative();
          //this.dispachSaveRepresentativeUser();
        });
    },
    getProfile() {
      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient.get("/oficina/user/profile").then((response) => {
        this.user = response.data.UserProfile.user;
        console.log(this.user);
        this.dispatchProfile();
      });
    },
  },
};
</script>

<style scoped>
.scale-up-center {
  -webkit-animation: scale-up-center 0.5s cubic-bezier(0.39, 0.575, 0.565, 1)
    both;
  animation: scale-up-center 0.5s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

/* ----------------------------------------------
 * Generated by Animista on 2023-2-10 16:35:20
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation scale-up-center
 * ----------------------------------------
 */
@-webkit-keyframes scale-up-center {
  0% {
    -webkit-transform: scale(0.6);
    transform: scale(0.6);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes scale-up-center {
  0% {
    -webkit-transform: scale(0.6);
    transform: scale(0.6);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

.svg {
  max-width: 25px;
  margin-left: 10px;
  animation-name: comunicacion;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}

@keyframes comunicacion {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(10deg);
  }
  50% {
    transform: rotate(-10deg);
  }
}

nav {
  padding: 15px;
}

nav a {
  font-weight: bold;
  color: var(--text-color);
}

.nav-container {
  color: var(--text-color);
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  width: 20%;
  padding: 0;
  height: 90vh;
}

.bn3:first-child {
  background-color: var(--red);
}

.bn3 {
  background: var(--blue);
  display: inline-block;
  padding: 5px;
  margin: 0 0.1em 0.1em 0;
  border: 0.16em solid rgb(255, 255, 255);
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  color: #2d2d2d;
  text-align: center;
  transition: all 0.2s;
  width: 100%;
}

.bn3:hover {
  background-color: rgb(63, 119, 192);
}

.bn3:focus {
  background-color: rgb(63, 119, 192);
}

/* CSS */
a {
  text-decoration: none;
}
.usuario {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: left;
  width: 300px;
}

.logo {
  width: 70%;
  margin: 10% 0;
}

.usuario-img {
  width: 80px;
}

.usuario-details {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-flow: column wrap;
  padding-left: 20px;
  text-align: left;
}

/* CSS */
.nav-btn {
  background-color: #e1ecf4;
  border-radius: 3px;
  border: 1px solid #7aa7c7;
  box-shadow: rgba(255, 255, 255, 0.7) 0 1px 0 0 inset;
  color: #39739d;
  cursor: pointer;
  outline: none;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 15px;
  text-align: center;
  text-decoration: none;
  user-select: none;
}

.nav-btn:hover,
.nav-btn:focus {
  background-color: var(--yellow);
  color: #2c5777;
}

.nav-btn:focus {
  box-shadow: 0 0 0 4px rgba(0, 149, 255, 0.15);
}

.nav-btn:active {
  background-color: #a0c7e4;
  box-shadow: none;
  color: #2c5777;
}

@media (max-width: 800px) {
  .nav-container {
    display: none;
  }
}
.nameRepresntative {
  cursor: pointer;
  color: #2c5777;
}
</style>
