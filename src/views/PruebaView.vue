<template>
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
        <input
          class="btn btn-secondary m-1"
          type="button"
          @click="PDF"
          value="Exportar  pdf"
        />

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
                <h2>Nombre del tramite</h2>
                <h4>Pregunta 1</h4>
                <p>respuesta, opcion elegida</p>
                <h4>Pregunta 1</h4>
                <p>respuesta, opcion elegida</p>
                <h4>Pregunta 1</h4>
                <p>respuesta, opcion elegida</p>
                <h4>Pregunta 1</h4>
                <p>respuesta, opcion elegida</p>
                <h4>Pregunta 1</h4>
                <p>respuesta, opcion elegida</p>
                <h4>Pregunta 1</h4>
                <p>respuesta, opcion elegida</p>
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
import html2pdf from "html2pdf.js";
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
      alert("Terminar funcion");
      //     var doc = new jsPDF()
      // doc.setTextColor(120,12,3)
      // doc.setFontSize(22)

      // doc.text(20, 20, 'Pregunta 1')

      // doc.setTextColor(20)
      // doc.setFontSize(16)
      // doc.text(20, 30, 'This is some normal sized text underneath.')
    },
    verComprobante() {
      this.comprobante = !this.comprobante;
    },
    PDF() {
      var element = document.getElementById("elemento");

      html2pdf(element);
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
</style>
