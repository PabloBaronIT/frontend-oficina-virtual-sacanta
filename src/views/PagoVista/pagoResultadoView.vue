<template>
  <div class="container">
    <div v-if="this.loading" class="spinner-border loading" role="status">
      <span class="sr-only"></span>
    </div>

    <div v-else class="container">
      <h1>{{ this.message }} <br /></h1>
      <h2>Gracias por utilizar la oficina virtual de Sacanta</h2>
      <div class="constancia">
        <h1>Nombre de tramite</h1>
        <p>valor de $100</p>
        <p>Numero de operacion:{{}}</p>
        <h4>Pepe Pepito cuil: 27322213552</h4>
        <p>fecha: 01/09/2023</p>
      </div>
      <img src="@/assets/logoSacanta.svg" alt="Sacanta" class="imagenlogo" />
      <router-link :to="`/munienlinea`" class="bn3"> Inicio </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import setToken from "@/middlewares/setToken";
import setTokenRelations from "@/middlewares/setTokenRelations";
import { BASE_URL } from "@/env";

export default {
  name: "Pago-exitoso",
  created() {
    this.IdResultado = this.$route.query.IdResultado;
    this.IdReferenciaOperacion = this.$route.query.IdReferenciaOperacion;
    this.loading = true;
    this.setPayment();
    this.getMyProfile();
    this.dispatchLoginPermission();
  },
  data() {
    return {
      IdResultado: "",
      IdReferenciaOperacion: "",
      message: "",
      loading: false,
      user: "",
      cidiCookie: "",
    };
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
  methods: {
    dispatchLoginPermission() {
      this.$store.dispatch("mockPaseAction");
    },
    setPayment() {
      console.log(
        this.IdResultado,
        this.IdReferenciaOperacion,
        "soy el idResutado y el IdReferencia"
      );

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
        .post("/confirm-payment/" + this.IdReferenciaOperacion)
        .then((response) => {
          console.log(response.data);
          this.message = response.data.message;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          // this.message = error.response.data.message;
          // this.loading = false;
          // if (error.response.status === 500) {
          //   if (error.response.data.message === "Token de usuario expirado") {
          //     setToken();
          //     this.setPayment();
          //   }
          //   if (
          //     error.response.data.message === "Token de representante expirado"
          //   ) {
          //     setTokenRelations();
          //     this.setPayment();
          //   }
          // }
        });
    },
    dispatchLogin() {
      this.$store.dispatch("mockLoginAction", this.user);
    },
    dispatchCidi() {
      this.$store.dispatch("mockCidiAction", this.cidiCookie);
    },
    dispatchLoginTrue() {
      this.$store.dispatch("mockPaseAction");
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
          this.user.cidiCookie = this.cidiCookie;
          this.dispatchLogin();
          this.dispatchLoginTrue();
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
  },
};
</script>

<style scoped>
.container {
  padding-top: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.constancia {
  width: 50vw;
  display: block;
  margin: auto;
  background: rgb(255, 255, 255);
  text-align: center;
  margin-top: 3rem;
  padding: 1rem;
}
.bn3 {
  height: 3rem;
  width: 11rem;
  border: 0.16em solid rgb(255, 255, 255);
  text-align: center;
  background-image: linear-gradient(
    to right,
    #399943,
    #4ea242,
    #62aa40,
    #75b23f,
    #88ba3e
  );
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding-top: 0.8rem;
  margin-top: 1rem;
  transition: all 0.2s;
  border-style: none;
}
.imagenlogo {
  width: 100px;
  height: 120px;
  margin-top: 2rem;
}
</style>
