<template>
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
        class="btn btn-secondary"
        type="button"
        @click="PDF"
        value="Exportar  pdf"
      />
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
    };
  },
  created() {
    setTimeout(() => {
      this.modal = true;
    }, 1000);
  },
  components: { PagarComponent },
  methods: {
    PDF() {
      var element = document.getElementById("elemento");

      html2pdf(element);
    },
  },
};
</script>

<style scoped>
.prueba-container {
  width: 100%;
  height: 100vh;
  display: flex;
  padding: 20px;
  flex-flow: column wrap;
  background: rgb(235, 235, 235);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
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
