<template>
  <div class="bar-container">
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: ["January", "February", "March"],
        datasets: [
          {
            label: "Fianlizados",
            backgroundColor: ["rgb(255, 99, 132)"],
            data: [10, 20, 12],
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
.bar-container {
  width: 40%;
}
</style>
