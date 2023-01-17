<template>
  <div class="cuenta-container">
    <Header />
    <Datos />
  </div>
</template>

<script>
import Header from "@/components/MiCuenta/HeaderComponent.vue";
import Datos from "@/components/MiCuenta/DatosComponent.vue";
import dbService from "@/services/dbService";

export default {
  name: "CuentaView",
  components: {
    Header,
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
