<template>
  <div>
    <div class="main">
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
          <!--<input
            class="btn btn-secondary m-1"
            type="button"
            @click="PDF"
            value="Exportar  pdf"
          />-->

          <button
            type="button"
            class="btn btn-primary m-1"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Ver comprobante
          </button>

          <!-- Modal -->
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div
              class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
            >
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    Comprobante
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body text-start">
                  <p>Fecha: {{ this.verFecha() }}</p>
                  <h2>{{ this.$store.state.procedure[0].title || "" }}</h2>

                  <div
                    v-for="(ans, key) in this.$store.state.procedure[0]
                      .questions"
                    :key="key"
                    class="answer"
                  >
                    <!-- <h4>{{ ans.question }}</h4> -->

                    <p>holaaa</p>
                    <!-- <p>{{ ans.options[0].questionOption || "" }}</p>
                    <p>{{ ans.options[0].answer || "" }}</p> -->
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
                  <button
                    type="button"
                    @click="download"
                    class="btn btn-primary"
                  >
                    Descargar
                  </button>
                </div>
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
//  import pdfMake from "pdfmake";
export default {
  name: "PruebaView",
  data() {
    return {
      modal: false,
      comprobante: false,
    };
  },
  created() {
    setTimeout(() => {
      this.modal = true;
    }, 1000);
  },
  components: { PagarComponent },
  methods: {
    download() {
      //let docDefinition = {};

      // pdfMake.cretePdf(docDefinition).download();
      window.print();
    },
    verComprobante() {
      this.comprobante = !this.comprobante;
    },
    verFecha() {
      let iso = this.$store.state.procedure[0].date;
      let date = new Date(iso);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      //Carga del procedure
      let fecha = `${day}/${month}/${year}`;
      return fecha;
    },
  },
};
</script>

<style scoped>
.main {
  width: 100%;
  height: 100vh;
  background-color: var(--grey-bk);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 90%;
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
