<template>
  <div class="nav-container">
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown asd"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i class="bi bi-list" style="font-size: 22px"></i>
      </button>
      <ul class="dropdown-menu">
        <li>
          <router-link :to="'/munienlinea'" class="dropdown-item"
            >Inicio</router-link
          >
        </li>
        <li>
          <router-link :to="'/micuenta'" class="dropdown-item"
            >Mi cuenta</router-link
          >
        </li>
        <li>
          <router-link :to="`/tramites`" class="dropdown-item"
            >Presentadas</router-link
          >
        </li>
        <li>
          <router-link :to="`/notificaciones`" class="dropdown-item"
            >Notificaciones</router-link
          >
        </li>
        <li>
          <router-link :to="`/notificaciones`" class="dropdown-item"
            >Impuestos Municipales</router-link
          >
        </li>
      </ul>
    </div>
    <!--logo muni-->
    <router-link :to="`/munienlinea`">
      <img
        src="./../../assets/images/logo-muni.svg"
        alt="Sacanta"
        class="imagenlogo"
      />
    </router-link>

    <!--mi cuenta-->
    <div class="usuario">
      <div class="circuloAvatar" v-if="this.avatar">
        <img :src="this.avatar" alt="imagen" v-if="this.avatar" />
      </div>
      <div class="usuario-details" v-if="this.$store.state.user">
        <div>
          <h4>
            Hola
            <strong> {{ $store.state.user.firstname }}! </strong>
          </h4>
          <!-- datos del respresentante si lo hay -->
          <div>
            <p
              v-if="this.$store.state.representante"
              style="font-size: 13px; margin-top: -0.5rem"
            >
              Representado por:
              <strong class="nameRepresntative">
                {{ $store.state.representante.firstname }}
                {{ $store.state.representante.lastname }}
              </strong>
            </p>
          </div>
          <h5 style="margin-top: -1rem">CUIL: {{ $store.state.user.cuil }}</h5>
          <router-link v-show="permission" :to="`/micuenta`">
            <p style="margin-top: -11px; font-size: 15px">Mi cuenta</p>
          </router-link>
        </div>
      </div>
    </div>
    <div class="muniEnlinea">
      <router-link to="/munienlinea">
        <img
          class="logo scale-up-center"
          src="./../../assets/images/MuniEnLinea.svg"
          alt=""
        />
      </router-link>
      <div style="display: flex; flex-direction: row; padding-top: 2vh">
        <router-link :to="`/notificaciones`">
          <div class="botonNotificacion">
            <i class="bi bi-bell"> </i>
          </div>
          <!-- <div v-if="this.lengtNotifications > 0" class="sinleer"></div> -->
        </router-link>
        <div class="botonOut" @click="this.logOf">
          <i class="bi bi-power"></i>
        </div>
      </div>
      <!-- <div
        v-if="this.modalNotificacion && this.notificacion != null"
        class="modalNotifiacion"
      >
        <div
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          "
        >
          <h5>{{ this.notificacion.subject }}</h5>
          <p
            @click="
              () => {
                (this.modalNotifiacion = false),
                  (this.notificacion = null),
                  (this.notificationNew = false);
              }
            "
          >
            X
          </p>
        </div>
        <p>
          {{ this.notificacion.message }}
        </p>
      </div> -->
    </div>
  </div>
</template>
<script>
import axios from "axios";
import setToken from "@/middlewares/setToken";
import setTokenRelations from "@/middlewares/setTokenRelations";
import { BASE_URL, PASSWORD_HEADER } from "@/env";
import { googleLogout } from "vue3-google-login";
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
      lengtNotifications: 0,
      notificationNew: false,
      notificacion: null,
      // modalNotificacion: false,
      // ||
      // "https://res.cloudinary.com/ddko88otf/image/upload/v1692727232/240_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv_t3fopl.jpg",
    };
  },

  created() {
    // setInterval(() => {
    // this.getNotifications();
    // }, 60000 * 2); //cada 3 minutos pregunta a la api

    this.role = this.$store.state.user?.role;
    this.getMyProfile();
    let idRepresentante = localStorage.getItem("idRepresentante") || null;
    if (idRepresentante) {
      this.getRepresentante(idRepresentante);
    }
  },
  // watch: {
  //   lengtNotifications(newValue, olValue) {
  //     // if (newValue > olValue) {
  //     //   this.notificationNew = true;
  //     // }
  //     if (newValue > olValue) {
  //       this.notificationNew = true;
  //     }
  //   },
  // },

  methods: {
    // SentNotificacion() {
    //   console.log("hola notifiacion");
    //   if (this.notificacion != null) {
    //     this.modalNotificacion = true;
    //   }
    // },
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
    getNotifications() {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get("/communications/my-communications?page=1")
        .then((response) => {
          console.log(response.data, "soy las notificaciones");
          let asd = response.data.Communications;
          let sinleer = [];
          for (let index = 0; index < asd.length; index++) {
            if (asd[index]?.read === false) sinleer.push(asd[index]);
          }
          this.lengtNotifications = sinleer.length;
          // if (
          //   this.lengtNotifications != response.data?.Communications?.length
          // ) {
          //   this.lengtNotifications = response.data?.Communications?.length;
          //   this.notificacion = response.data.Communications[0];
          //   console.log("llego la novedad");
          //   // this.notificationNew = true;
          // } else {
          //   console.log("sigue igual");
          //   this.notificationNew = false;
          // }
          // console.log(this.lengtNotifications, "soy la cantidad de notifi");
        })
        .catch((error) => {
          console.log(error);
          this.lengtNotifications = 0;
          if (error.response.status === 500) {
            if (error.response.data.message === "Token vencido") {
              setToken();
              this.getNotifications();
            }
          }
          if (error.response.status === 401) {
            this.$router.push("micuenta-update");
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
      this.dispatchOutLogin();
      location.reload();
      this.$router.push("login");
      googleLogout();
      document.cookie = "cidi=; max-age=0";
      window.dispatchEvent(
        new CustomEvent("token-localstorage-changed", {
          detail: {
            storage: localStorage.getItem("token"),
          },
        })
      );
    },
    dispatchOutLogin() {
      this.$store.dispatch("mockOutAction");
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
/* CSS NUEVO */
.dropdown {
  display: none;
}
.nav-container {
  position: fixed;
  z-index: 15;
  height: 17vh;
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-top: 1rem;
  padding-left: 0;
}
.imagenlogo {
  width: 12vw;
  height: 10vh;
  position: relative;
  margin-left: 2.6vw;
}
.usuario {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: left;
  margin-left: 6vw;
}
.circuloAvatar {
  width: 5.5vw;
  height: 11.1vh;
  background-image: linear-gradient(90deg, #e52320 0%, #ffcc03 100%);
  border-radius: 50%;
  align-content: center;
  padding-top: 0.2rem;
  padding-left: 0.2rem;
  padding-bottom: 0.2rem;
}
.usuario img {
  width: 5vw;
  height: 10vh;
}

.usuario-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
  text-align: left;
  font-size: 20px;
  color: #128d44;
  width: 360px;
}
.sinleer {
  position: absolute;
  top: 20%;
  left: 65%;
  font-size: 24px;
  background: red;
  border-radius: 50%;
  height: 15px;
  width: 15px;
}
.botonNotificacion {
  position: relative;
  max-height: 50px;
  min-width: 50px;
  border-radius: 50%;
  background-image: linear-gradient(
    to right,
    #ffcc03,
    #ffa800,
    #fb8200,
    #f3590d,
    #e52320
  );
  margin-right: 23px;
  font-size: 30px;
  color: whitesmoke;
  text-align: center;
  padding-right: 3px;
  padding-top: 3px;
  transform: rotate(40deg);
}
.botonOut {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  /* background: red; */
  background-image: linear-gradient(
    to right,
    #ffcc03,
    #ffa800,
    #fb8200,
    #f3590d,
    #e52320
  );
  margin-right: 23px;
  font-size: 30px;
  color: whitesmoke;
  text-align: center;
  cursor: pointer;
}
.logo {
  width: 9vw;
  height: 7.6vh;
}
.muniEnlinea {
  position: relative;
  display: flex;
  flex-direction: row;
  width: 22vw;
  justify-content: space-between;
  position: absolute;
  right: 5vw;
}
a {
  text-decoration: none;
  color: #128d44;
}
.nameRepresntative {
  cursor: pointer;
  color: #128d44;
}
h5,
p {
  color: #e52320;
}
/* ------------------------------------------------------------ */
@media (max-width: 1200px) {
  .muniEnlinea {
    /* justify-content: space-around; */
    width: 25vw;
  }
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
  .logo {
    width: 15vw;
  }
  .muniEnlinea {
    /* justify-content: space-around; */
    width: 40vw;
  }
}
@media (max-width: 800px) {
  .dropdown {
    display: block;
  }
  .asd {
    width: 50px;
    background: #128d44;
  }
  .asd:hover {
    background: #128d44;
  }
  .usuario {
    display: none;
  }
  .imagenlogo {
    width: 20vw;
  }
  .botonNotificacion {
    height: 40px;
    width: 40px;
    font-size: 25px;
  }
  .botonOut {
    height: 40px;
    width: 40px;
    font-size: 25px;
    cursor: pointer;
  }
  .muniEnlinea {
    /* justify-content: space-around; */
    width: 50vw;
  }
}
@media (max-width: 600px) {
  .imagenlogo {
    width: 30vw;
    height: 6vh;
  }
}
</style>
