<template>
  <div v-if="this.modal == true" class="grafico-container">
    <h1>Estado del municipal</h1>
    <Doughnut :data="chartData" :options="chartOptions" />
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
// import dbservice from "@/services/dbService";

// import { Bar } from "vue-chartjs";
import { Doughnut } from "vue-chartjs";
import setTokenMuni from "@/middlewares/setTokenMuni";
import axios from "axios";
import { BASE_URL } from "@/env";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  // BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  // BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

export default {
  name: "GraficoComponent",

  components: { Doughnut },
  data() {
    return {
      modal: false,
      chartData: {},
      chartOptions: {
        responsive: true,
      },
    };
  },
  methods: {
    sampleAsync(r, f, i, c) {
      this.chartData = {
        labels: [
          "Presentado",
          "En proceso",
          "Pausado por requerimiento",
          "Finalizado",
        ],
        datasets: [
          {
            label: "Tramites",
            data: [r, f, c, i],
            backgroundColor: [
              "rgb(104, 185, 132",
              "rgb(240, 169, 47)",
              "rgb(139, 167, 190)",
              "rgb(225, 77, 42)",
            ],
            hoverOffset: 4,
          },
        ],
      };
    },
    getProfileMuni() {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get("/municipales/muni-profile")
        .then((response) => {
          let r =
            response.data.MuniProfile.muniStatistics
              .muniSolicitedProceduresCount;
          let f =
            response.data.MuniProfile.muniStatistics
              .muniInProcessProceduresCount;
          let i =
            response.data.MuniProfile.muniStatistics
              .muniFinalizedProceduresCount;
          let c =
            response.data.MuniProfile.muniStatistics
              .muniUnderReviewProceduresCount;
          //console.log(r, f, i);
          this.sampleAsync(r, f, c, i);
          this.modal = true;
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setTokenMuni();
              this.getProfileMuni();
            }
          }
        });
    },
  },
  created() {
    this.getProfileMuni();
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
