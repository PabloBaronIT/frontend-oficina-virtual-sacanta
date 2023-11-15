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
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
.cuenta-container {
  /* position: relative;
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  background: rgb(235, 235, 235);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  padding: 30px; */
  width: 100%;
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}
</style>
