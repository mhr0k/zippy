<template>
  <Chart
    v-if="globalResults.data"
    :data="chartData"
    :options="chartOptions"
    :key="props.view + globalResults.count"
  />
</template>

<script setup>
import { onMounted, watch } from "vue";

// Test result state data
import { useGlobalResultsStore } from "@client/stores/globalResultsStore";
const globalResults = useGlobalResultsStore();
onMounted(() => globalResults.fetch());

// Chart view selection
const props = defineProps({ view: { type: String, default: "wpm" } });

// Chart component setup
import { Bar as Chart } from "vue-chartjs";
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

// Chart colors
const primary = "#a5d601";
const accent = "#d24317";
function transparent(color) {
  return color + "80";
}

// Chart component config
const chartData = {
  labels: null,
  datasets: [
    {
      label: "Records",
      backgroundColor: null,
      hoverBackgroundColor: null,
      data: null,
    },
  ],
};
const chartOptions = {
  plugins: {
    legend: false,
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
  },
  elements: {
    line: {
      tension: 0.5,
    },
  },
};

// Chart data updater
watch(
  () => [globalResults.data, props.view],
  () => {
    if (globalResults.data) {
      const entries = globalResults[props.view].tiers;
      const purgedEmpty = entries.filter((e) => e.count > 0);
      setupData(purgedEmpty);
      setupColors(purgedEmpty);
    }
  }
);

// Chart data updater helper functions
function setupData(entries) {
  chartData.labels = entries.map((e) => e.range);
  chartData.datasets[0].data = entries.map((e) => e.count);
}
function setupColors(entries) {
  const colorSet = entries.map((e) => (e.current ? accent : primary));
  chartData.datasets[0].backgroundColor = colorSet.map((e) => transparent(e));
  chartData.datasets[0].hoverBackgroundColor = colorSet;
}
</script>

<style scoped lang="postcss">
.bar-chart {
  background-color: #4caf50;
}
</style>
