<template>
  <div class="asd">
    <!--logo muni-->
    <img
      src="@/assets/LogoSacantaHorizontal.svg"
      alt="Sacanta"
      class="imagenlogo"
    />

    <!--mi cuenta-->
    <div class="usuario">
      <!-- <svg
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
      </svg> -->
      <img :src="this.avatar" alt="imagen" />
      <div class="usuario-details" v-if="this.$store.state.user">
        <div>
          <!-- <router-link v-show="permission" :to="`/micuenta`">
            Mi cuenta
          </router-link> -->
          <h4>
            Hola
            <strong>
              {{ $store.state.user.firstname }}
            </strong>
          </h4>
          <span>CUIL: {{ $store.state.user.cuil }} </span>
          <!-- <img
            class="svg"
            src="@/assets/comunicacion.svg"
            alt="comunicaciones"
          />-->
        </div>
        <div>
          <p>
            <!-- {{ $store.state.user.firstname }} {{ $store.state.user.lastname }} -->
            <!-- <br />
            <span>CUIL: {{ $store.state.user.cuil }} </span> -->
          </p>
        </div>

        <div>
          <p v-if="this.$store.state.representante">
            Representado por:
            <strong class="nameRepresntative">
              {{ $store.state.representante.firstname }}
              {{ $store.state.representante.lastname }}
            </strong>
          </p>
        </div>
      </div>
    </div>
    <router-link to="/munienlinea">
      <img class="logo scale-up-center" src="@/assets/MuniEnLinea.svg" alt="" />
    </router-link>
    <!-- <button
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasScrolling"
      aria-controls="offcanvasScrolling"
    >
      <img class="svg" src="@/assets/menu.svg" alt="" />
    </button> -->

    <!-- <div
      class="offcanvas offcanvas-start"
      daa-bs-scroll="true"
      data-bs-backdrop="false"
      tabindex="-1"
      id="offcanvasScrolling"
      aria-labelledby="offcanvasScrollingLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasScrollingLabel">
          <img
            class="logo"
            src="https://github.com/PabloBaronIT/frontend-oficina-virtual/blob/main/src/assets/muni-en-linea-logo.png?raw=true"
            alt="Logo"
          />
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <img class="svg" src="@/assets/close.svg" alt="" />
        </button>
      </div>
      <div class="offcanvas-body body-container">
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
          <div class="usuario-details">
            <div class="datos">
              <router-link :to="`/micuenta`"> Mi cuenta </router-link>
              <router-link :to="`/comunicaciones`">
                <a href="">
                  <img
                    class="svg"
                    src="@/assets/comunicacion.svg"
                    alt="comunicaciones"
                  />
                </a>
              </router-link>
            </div>
            <strong>
              {{ this.usuario }},<br />
              {{ this.apellido }}<br />
            </strong>
            <p>CUIL: {{ this.dni }}</p>
          </div>
        </div>
        <router-link :to="`/munienlinea`" class="bn3"> Inicio </router-link>
        <router-link :to="`/tramites`" class="bn3"> Mis tramites </router-link>
        <router-link
        :to="`/auth/reset-password/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjc2NTc5MjM4LCJleHAiOjE2NzY1ODAxMzh9.sWwDOv_FoM8ruehI3NIcYgeyFzYCSe4aJWOe_8c3dx0`"
        class="bn3"
      >
        Mis tramites
      </router-link>

        <input @click="logOf" class="bn3" type="button" value="Cerrar Sesion" />
      </div>
    </div> -->

    <!-- <div
      class="offcanvas offcanvas-start"
      data-bs-scroll="true"
      data-bs-backdrop="false"
      tabindex="-1"
      aria-labelledby="offcanvasScrollingLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvas">
          Offcanvas with body scrolling
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
    </div> -->
  </div>
</template>
<script>
import axios from "axios";
import setToken from "@/middlewares/setToken";
import setTokenRelations from "@/middlewares/setTokenRelations";
import { PASSWORD_HEADER, BASE_URL } from "@/env";

export default {
  name: "NavTopVue",
  data() {
    return {
      ruta: this.$router.currentRoute.value.fullPath,
      //usuario: localStorage.getItem("firstname"),
      //apellido: localStorage.getItem("lastname"),
      //dni: localStorage.getItem("cuil"),
      permission: true,
      //user_id: localStorage.getItem("id"),
      //role: localStorage.getItem("role"),
      user: "",
      representante: "",
      avatar: this.$store.state.user?.avatar,
      // ||
      // "https://res.cloudinary.com/ddko88otf/image/upload/v1692727232/240_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv_t3fopl.jpg",
    };
  },
  created() {
    this.role = this.$store.state.user?.role;
    this.getMyProfile();
    let idRepresentante = localStorage.getItem("idRepresentante") || null;
    if (idRepresentante) {
      this.getRepresentante(idRepresentante);
    }
  },
  watch: {},

  methods: {
    dispatchLogin() {
      this.$store.dispatch("mockLoginAction", this.user);
    },
    dispatchRepresentante() {
      this.$store.dispatch("mockRepresentanteAction", this.representante);
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
          // this.user.cidiCookie = this.cidiCookie;
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
          "access-user-header": PASSWORD_HEADER,
        },
      });
      apiClient
        .get("/oficina/users/" + id)
        .then((response) => {
          console.log(response.data, "datos representante");

          this.representante = response.data.User;
          // localStorage.setItem(
          //   "representanteFirstname",
          //   response.data.User.firstname
          // );
          // localStorage.setItem(
          //   "representanteLastname",
          //   response.data.User.lastname
          // );

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

    // changeRepresentative() {
    //   console.log("cambiew");
    //   const apiClient = axios.create({
    //     //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
    //     baseURL: process.env.VUE_APP_BASEURL,
    //     withCredentials: false,
    //     headers: {
    //       "auth-header": localStorage.getItem("tokenCopia"),
    //     },
    //   });
    //   apiClient
    //     .post("/representations/choose-representation", {
    //       representativeId: this.$store.state.RepresentativeUser.id,
    //     })
    //     .then((response) => {
    //       console.log(response.data.message);
    //       window.localStorage.removeItem("token");
    //       window.localStorage.setItem("token", response.data.token);
    //       this.getProfile();
    //       setTimeout(() => this.$router.push("munienlinea"), 2000);
    //       this.dispatchClearRepresentativeUser();
    //       //this.dispatchRepresentative();
    //       //this.dispachSaveRepresentativeUser();
    //     });
    // },
    // getProfile() {
    //   const apiClient = axios.create({
    //     //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
    //     baseURL: process.env.VUE_APP_BASEURL,
    //     withCredentials: false,
    //     headers: {
    //       "auth-header": localStorage.getItem("token"),
    //     },
    //   });
    //   apiClient.get("/oficina/user/profile").then((response) => {
    //     this.user = response.data.UserProfile.user;
    //     console.log(this.user);
    //     this.dispatchProfile();
    //   });
    // },
  },
};
</script>

<style scoped>
.asd {
  height: 152px;
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-top: 1rem;
  padding-left: 0;
}
.body-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
}
.bn3 {
  background: var(--blue);
  display: inline-block;
  padding: 5px;
  margin: 8px 5px;
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

.logo {
  width: 170px;
}

/* .svg {
  max-width: 30px;
} */
.usuario {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: left;
  margin-left: 7rem;
}
/* .usuario svg {
  width: 94px;
} */

.usuario-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
  text-align: left;
  font-size: 20px;
  color: #128d44;
  width: 300px;
}
/* .usuario-details a {
  text-decoration: none;
  color: red;
  font-size: 20px;
  font-weight: bold;
} */
img {
  width: 94px;
  height: 93px;
}

button {
  border: none;
  background: none;
  display: none;
}

.svg:hover {
  max-width: 45px;
}
.nameRepresntative {
  cursor: pointer;
  color: #2c5777;
}
.imagenlogo {
  width: 232px;
  height: 93px;
  position: relative;
  margin-left: 15px;
}

@media (max-width: 1000px) {
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin: 10px;
  }
}
</style>
