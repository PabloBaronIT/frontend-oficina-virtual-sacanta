<template>
  <div class="grafico-container">
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
  <!-- <div class="grafico-container">
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div> -->
</template>

<script>
import dbservice from "@/services/dbService";

// import { Bar } from "vue-chartjs";
import { Doughnut } from "vue-chartjs";
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

  mounted() {
    dbservice
      .getMunicipal(4)
      .then((response) => {
        console.log(response.data);
        let r = response.data.required;
        let f = response.data.finalized;
        let i = response.data.inprocess;

        this.sampleAsync(r, f, i);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    sampleAsync(r, f, i) {
      this.chartData = {
        labels: ["En proceso", "Finalizado", "Requerido"],
        datasets: [
          {
            label: "My First Dataset",
            data: [r, f, i],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      };
    },
  },
  components: { Doughnut },
  data() {
    return {
      chartData: {
        labels: ["En proceso", "Finalizado", "Requerido"],
        datasets: [
          {
            label: "My First Dataset",
            data: [1, 2, 3],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
};
</script>

<style scoped>
.grafico-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
