<template>
  <div class="finalizado-container" v-if="this.modal == true">
    <h2>El tramite ya casi esta finalizado!</h2>
    <h3>Al realizar tu pago se te enviara un comprobante del tramite.</h3>
    <PagarComponent />
  </div>
</template>
<script>
import PagarComponent from "@/components/Tramites/PagarComponents.vue";

export default {
  name: FinalizadoComponent,
  components: {
    PagarComponent,
  },
};
</script>

<style scoped></style>
