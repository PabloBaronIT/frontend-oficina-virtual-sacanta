<template>
  <div class="container">
    <!-- <div class="img">
      <img src="@/assets/mastercard.svg" alt="" />
      <img src="@/assets/visa.svg" alt="" />

      <img class="pagotic" src="@/assets/pagotic.svg" alt="" />
    </div> -->

    <div class="text">
      <b>{{ this.$store.state.procedure[0].title }}</b>
      <h2>Tramite arancelado</h2>
      <p>
        Este tramite tiene un valor total de ${{
          this.$store.state.procedure[0].precio
        }}
        <b></b>
      </p>
      <input
        class="btn"
        type="button"
        value="Abonar mi trámite"
        style="width: 50%"
        @click="submitPago"
      />

      <!-- <input class="cancel" type="button" value="Cancelar" @click="cancel" /> -->
    </div>
    <div class="alert alert-success" role="alert" v-if="this.modal">
      Abra el siguiente link en el navegador Google Chrome para realizar su pago
      <a href=""> {{ this.link }}</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import setToken from "@/middlewares/setToken";
import setTokenRelations from "@/middlewares/setTokenRelations";

export default {
  name: "PagarComponent",
  created() {
    this.procedure_amount = this.$store.state.procedure[0].precio;
    this.idTramitePago = parseInt(this.$route.params.idTramite);
    // console.log(
    //   this.procedure_amount,
    //   this.idTramitePago,
    //   "soy precio  e idtramite"
    // );

    let sUsrAg = navigator.userAgent;

    if (sUsrAg.indexOf("Chrome") > -1) {
      this.browser = "Google Chrome";
    } else if (sUsrAg.indexOf("Safari") > -1) {
      this.browser = "Apple Safari";
    } else if (sUsrAg.indexOf("Opera") > -1) {
      this.browser = "Opera";
    } else if (sUsrAg.indexOf("Firefox") > -1) {
      this.browser = "Mozilla Firefox";
    } else if (sUsrAg.indexOf("MSIE") > -1) {
      this.browser = "Microsoft Internet Explorer";
    }

    console.log("Usted está utilizando: " + this.browser);

    // let sUsrAg = window.navigator.userAgent;
    // if (sUsrAg.indexOf("Chrome") > -1) {
    //   this.navegador = true;
    // } else {
    //   this.navegador = false;
    // }
  },
  data() {
    return {
      procedure_amount: "",
      idTramitePago: "",
      modal: false,
      link: "",
      browser: "",
    };
  },
  methods: {
    submitPago() {
      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .post("/payment-procedure", {
          procedure_history_id: this.idTramitePago,
          procedure_amount: this.procedure_amount,
        })
        .then((response) => {
          console.log(response.data);
          if (this.browser === "Google Chrome") {
            window.location.href = response.data.Url;
          } else {
            this.link = response.data.Url;
            this.modal = true;
          }
          //window.location.href = response.data.redirectURL;
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.submitPago();
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.submitPago();
            }
          }
        });
      //console.log(this.procedure_amount, "soy el valor del tramite");
    },
  },
};
</script>
<!-- IdResultado=57645cce-a0f6-4d5e-bfc5-97103327997b&IdReferenciaOperacion=01#inbox respuesta de SIRO -->
<style scoped>
.cancel {
  border: none;
  background: none;
  font-weight: 100;
  text-decoration: underline;
  color: var(--text-color);
}

.pagotic {
  max-width: 100px;
}

.container {
  border: 1px solid var(--green);
  padding: 0;
  display: flex;
  flex-flow: row wrap;
  height: 150px;
}

.text {
  width: 70%;
  margin: auto;
}

.img {
  width: 20%;
  background: var(--green);
}

.btn {
  background: var(--green);
  color: #000;
  width: 80%;
}

img {
  max-width: 40px;
  margin: 10px;
}
</style>
