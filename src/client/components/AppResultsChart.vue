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
import { resultsStore } from "@/stores/resultsStore";
const globalResults = resultsStore();

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

const primary = getComputedStyle(document.body).getPropertyValue("--primary");
const accent = getComputedStyle(document.body).getPropertyValue("--accent");
const text = getComputedStyle(document.body).getPropertyValue("--text");
const bgLighter = getComputedStyle(document.body).getPropertyValue(
  "--bg-lighter"
);
function transparent(color) {
  return color + "80";
}

// Chart component config
ChartJS.defaults.color = text;
ChartJS.defaults.borderColor = bgLighter;
const chartData = {
  datasets: [
    {
      label: "Records",
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
    setupData();
  }
});
</script>
