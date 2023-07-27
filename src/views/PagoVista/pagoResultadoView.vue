<template>
  <div class="container">
    <div v-if="this.loading" class="spinner-border loading" role="status">
      <span class="sr-only"></span>
    </div>
    <div v-else class="container">
      <h1>{{ this.message }} <br /></h1>
      <h2>Gracias por utilizar la oficina virtual de Sacanta</h2>
      <img src="@/assets/logoSacanta.svg" alt="Sacanta" class="imagenlogo" />
      <router-link :to="`/munienlinea`" class="bn3"> Inicio </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import setToken from "@/middlewares/setToken";
import setTokenRelations from "@/middlewares/setTokenRelations";
export default {
  name: "Pago-exitoso",
  created() {
    this.IdResultado = this.$route.query.IdResultado;
    this.IdReferenciaOperacion = this.$route.query.IdReferenciaOperacion;
    this.loading = true;
    this.setPayment();
  },
  data() {
    return {
      IdResultado: "",
      IdReferenciaOperacion: "",
      message: "",
      loading: false,
    };
  },
  methods: {
    setPayment() {
      console.log(
        this.IdResultado,
        this.IdReferenciaOperacion,
        "soy el idResutado y el IdReferencia"
      );

      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
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
          this.message = error.response.data.message;
          this.loading = false;
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.setPayment();
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.setPayment();
            }
          }
        });
    },
  },
};
</script>

<style scoped>
.container {
  padding-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
