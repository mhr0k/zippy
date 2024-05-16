<template>
  <Chart
    :data="chartData"
    :options="chartOptions"
    :key="props.view + globalResults.count"
  />
</template>

<script setup>
import { watchEffect } from "vue";

// Test result state data
import { useGlobalResultsStore } from "@client/stores/globalResultsStore";
const globalResults = useGlobalResultsStore();

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

const setupData = () => {
  let entries = globalResults[props.view].tiers;
  entries = entries.filter((e) => e.count > 0);
  // dataset
  chartData.labels = entries.map((e) => e.range);
  chartData.datasets[0].data = entries.map((e) => e.count);
  // colors
  const colorSet = entries.map((e) => (e.current ? accent : primary));
  chartData.datasets[0].backgroundColor = colorSet.map((e) => transparent(e));
  chartData.datasets[0].hoverBackgroundColor = colorSet;
};

// Chart data updater
watchEffect(() => {
  if (globalResults.data && props.view) {
    console.log("setupData");
    setupData();
  }
});
</script>
