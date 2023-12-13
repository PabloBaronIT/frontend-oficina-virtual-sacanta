<template>
  <div>
    <!-- <div v-if="this.loading" class="spinner-border loading" role="status">
      <span class="sr-only"></span>
    </div> -->
    <div class="container l" v-if="this.loading">
      <div class="spinner-grow text-success" role="status">
        <span class="sr-only"></span>
      </div>
      <div class="spinner-grow text-success" role="status">
        <span class="sr-only"></span>
      </div>
      <div class="spinner-grow text-success" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
    <div v-else class="container">
      <h1>{{ this.message }} <br /></h1>
      <h2>Gracias por utilizar la oficina virtual de Sacanta</h2>
      <div
        class="constancia"
        v-if="this.dataPayment != null"
        id="constanciaPago"
      >
        <n5>
          {{ this.message }}
        </n5>
        <h4>Nombre del trámite: {{ this.dataPayment?.procedure.title }}</h4>
        <p>Valor abonado:$ {{ this.dataPayment?.procedure.price }}</p>
        <p>Numero de operación:{{ this.dataPayment.payment[0]?.payment_id }}</p>
        <h4>
          {{ this.dataPayment.user.firstname }}
          {{ this.dataPayment.user.lastname }} {{ this.dataPayment.user.cuil }}
        </h4>
        <p>Fecha: {{ this.fecha }}</p>
        <button type="button" @click="download" class="btn btn-primary">
          Descargar
        </button>
      </div>
      <img
        src="@/assets/images/logo-muni.svg"
        alt="Sacanta"
        class="imagenlogo"
      />
      <router-link :to="`/munienlinea`" class="bn3"> Inicio </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import setToken from "@/middlewares/setToken";
import setTokenRelations from "@/middlewares/setTokenRelations";
import { BASE_URL } from "@/env";
import jsPDF from "jspdf";

export default {
  name: "Pago-exitoso",
  created() {
    this.IdResultado = this.$route.query.IdResultado;
    this.IdReferenciaOperacion = this.$route.query.IdReferenciaOperacion;
    this.loading = true;
    this.dispatchLoginPermission();
    // this.getMyProfile();
    this.setPayment();
  },
  data() {
    return {
      IdResultado: "",
      IdReferenciaOperacion: "",
      message: "",
      loading: false,
      user: "",
      cidiCookie: "",
      dataPayment: null,
      fecha: "",
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
          this.dataPayment = response.data.ProcedureData;
          this.fecha =
            new Date(response.data.actual_date).toLocaleDateString() || "";

          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.message = error.response.data.message;
          this.dataPayment = null;
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
    download() {
      // window.print();
      var doc = new jsPDF("p", "pt", "A4");
      doc.setFontSize(20);
      doc.setTextColor(0, 128, 0);
      let imagenA =
        "https://github.com/PabloBaronIT/frontend-oficina-virtual/blob/main/src/assets/muni-en-linea-logo.png?raw=true";
      doc.addImage(imagenA, "JPEG", 50, 30, 60, 60);
      doc.text(20, 30, "Constacia de pago.");
      doc.setFontSize(15);

      doc.setTextColor(0, 0, 0);
      doc.text(
        20,
        60,
        `Tramite: ${this.dataPayment?.procedure.title}, Id: ${this.dataPayment?.id}`,
        {
          lineHeightFactor: 2,
        }
      );
      doc.text(20, 80, `Valor abonado: ${this.dataPayment?.procedure.price}`);

      doc.text(
        20,
        100,
        `Cuil: ${this.dataPayment?.user.cuil}, nombre: ${this.dataPayment?.user.firstname} ${this.dataPayment?.user.lastname}`
      );
      doc.text(
        20,
        120,
        `Numero de Operación: ${this.dataPayment.payment[0]?.payment_id}`
      );
      doc.text(20, 140, `Fechad de emisión: ${this.fecha}`);
      doc.save("Costancia de pago.pdf");
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 82%;
  background-color: #f5f5f5;
  position: absolute;
  right: 0;
  padding-top: 15%;
  padding-bottom: 15%;
  /*  */
  /* padding-left: 4%; */
  /* padding-right: 4%; */
}
.constancia {
  width: 60vw;
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
.l {
  flex-direction: row;
}
</style>
