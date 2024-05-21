<template>
  <section v-if="globalResults.status === 'success'">
    <AppResultsNav :view @update:view="(v) => (view = v)" />
    <AppResultsChart :view class="chart" />
  </section>
  <section v-else>
    <AppResultsLoading :status="globalResults.status" />
  </section>
</template>

<script setup>
import { ref } from "vue";
import AppResultsChart from "@/components/AppResultsChart.vue";
import AppResultsNav from "@/components/AppResultsNav.vue";
import AppResultsLoading from "@/components/AppResultsLoading.vue";

// Test result data
import { onMounted } from "vue";
import { resultsStore } from "@/stores/resultsStore";
const globalResults = resultsStore();
onMounted(() => globalResults.fetch());

// Chart view selection
const view = ref("wpm");
</script>

<style scoped lang="postcss">
section {
  display: flex;
  place-items: center;
  flex-direction: column;
  width: 80%;
  max-width: 1200px;
  @media (width <= 768px) {
    width: 100%;
    max-width: unset;
  }
  margin: 2rem 0;
  .chart {
    width: 100%;
  }
  .loading {
    &::part(text) {
      display: none;
    }
    &::part(value) {
      stroke: var(--primary);
    }
    &::part(circle) {
      stroke: var(--bg-darker);
    }
  }
}
</style>
