<template>
  <div class="cuenta-container">
    <Datos />
  </div>
</template>

<script>
import Datos from "@/components/MiCuenta/DatosComponent.vue";

export default {
  name: "CuentaView",
  components: {
    Datos,
  },
};
</script>

<style scoped>
.cuenta-container {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  background: rgb(235, 235, 235);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  padding: 30px;
}
</style>
