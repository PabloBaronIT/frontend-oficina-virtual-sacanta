<template>
  <div class="grafico-container">
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
  <div class="grafico-container">
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import { Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

export default {
  name: "GraficoComponent",
  components: { Bar, Doughnut },
  data() {
    return {
      chartData: {
        labels: ["En proceso", "Requerido", "Finalizado"],
        datasets: [
          {
            label: "Requerido",
            backgroundColor: "#f87979",
            data: [40],
          },
          {
            label: "Tramites",
            backgroundColor: "#f87979",
            data: [20],
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
