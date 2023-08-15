<template>
  <div class="main" v-if="setPermission">
    <div class="container">
      <div class="prueba-container l" v-if="!modal">
        <div class="spinner-grow text-primary" role="status">
          <span class="sr-only"></span>
        </div>
        <div class="spinner-grow text-secondary" role="status">
          <span class="sr-only"></span>
        </div>
        <div class="spinner-grow text-success" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
      <div v-show="modal" class="prueba-container" id="elemento">
        <h2>Último paso:</h2>
        <p>
          Este tramite es arancelado, una vez que se <br />
          procese el pago podra descargar su comprobante.
        </p>
        <PagarComponent />

        <button
          type="button"
          class="btn btn-primary m-1"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Ver detalles de trámite
        </button>

        <!-- MODAL DE DETALLE DE TRAMITE -->
        <div
          class="modal fade asd"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
          >
            <div class="modal-content" id="content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Detalle:
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div
                style="
                  display: flex;
                  flex-direction: row;
                  justify-content: space-between;
                  padding: 0px 1rem;
                "
              >
                <p>
                  Usuario:{{ this.$store.state.user.firstname }} {{ " " }}
                  {{ this.$store.state.user.lastname }}
                </p>
                <p>cuil:{{ this.$store.state.user.cuil }}</p>
              </div>
              <div class="modal-body text-start">
                <h2>
                  {{ this.$store.state.procedure[0].title || "" }}
                </h2>
                <div
                  style="
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    padding: 0px 1rem;
                  "
                >
                  <p>Fecha: {{ this.$store.state.procedure[0].fecha || "" }}</p>
                  <p>
                    Valor: {{ this.$store.state.procedure[0].precio || "" }}
                  </p>
                </div>

                <p>respuetas:</p>
                <div
                  v-for="(ans, key) in this.$store.state.procedure[0].questions"
                  :key="key"
                  class="answer"
                >
                  <p>{{ ans.question_option_history[0].answer || "" }}</p>
                </div>
              </div>
              <div class="footerCoprobante">
                <div>
                  <p>Declaro que los datos asignados son verdaderos.</p>
                </div>
                <div
                  v-if="this.$store.state.representante"
                  class="textRepresentative"
                >
                  Este trámite fue presentado por
                  <strong>
                    {{ this.$store.state.representante.firstname }}
                    {{ this.$store.state.representante.lastname }} en
                  </strong>

                  representacion de
                  <strong>
                    {{ this.$store.state.user.firstname }}
                    {{ this.$store.state.user.lastname }}
                  </strong>
                </div>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button type="button" @click="download" class="btn btn-primary">
                  Descargar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PagarComponent from "@/components/Tramites/PagarComponent.vue";
import jsPDF from "jspdf";

export default {
  name: "PagoView",
  data() {
    return {
      modal: false,
      comprobante: false,
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
  created() {
    setTimeout(() => {
      this.modal = true;
    }, 1000);
  },
  components: { PagarComponent },
  methods: {
    download() {
      // window.print();
      let asd = document.getElementById("content");
      var doc = new jsPDF("p", "pt", "A4");

      doc.html(asd, {
        y: 2,
        x: 2,

        callback: function (doc) {
          doc.save("ConstanciaPago.pdf");
        },
      });
    },
    verComprobante() {
      this.comprobante = !this.comprobante;
    },
  },
};
</script>

<style scoped>
.main {
  width: 90vw;
  height: 100vh;
  background-color: var(--grey-bk);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}
.asd {
  word-break: break-all;
}

.container {
  width: 90%;
  margin: auto;
}

.comprobante {
  position: absolute;
  top: 0;
}

.prueba-container {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
}

.l {
  flex-direction: row;
}

p {
  font-weight: 10;
}

h2 {
  color: var(--red);
}

@media (max-width: 1000px) {
  .main {
    width: 100vw;
  }
}
.footerCoprobante {
  width: 100%;
  font-size: 15px;
}
.textRepresentative {
  color: var(--red);
  padding: 1rem;
  border-top: 1px solid black;
}
</style>
