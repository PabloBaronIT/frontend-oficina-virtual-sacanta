<template>
  <div v-if="this.modal == true" class="grafico-container">
    <h1>Estado del municipal</h1>

    <input
      @click="this.modal = false"
      class="btn btn-primary mt-5"
      type="button"
      value="Cerrar"
    />
  </div>
  <!-- <div class="grafico-container">
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div> -->
</template>

<script>
//import dbservice from "@/services/dbService";

export default {
  name: "GraficoComponent",

  methods: {},
  components: {},
  created() {
    this.$watch(this.$store, (newQuestion) => {});
  },
  data() {
    return {
      modal: true,
    };
  },
};
</script>

<style scoped>
.grafico-container {
  z-index: 15;
  position: absolute;
  top: 5%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 400px; /* Need a specific value to work */
  border-radius: 10px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5.5px);
  -webkit-backdrop-filter: blur(5.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
</style>
