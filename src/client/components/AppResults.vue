<template>
  <section v-if="globalResults.loading">
    <AppResultsLoading :loading="globalResults.loading" />
  </section>
  <section v-else>
    <AppResultsNav :view @update:view="(v) => (view = v)" />
    <AppResultsChart :view class="chart" />
  </section>
</template>

<script setup>
import { ref } from "vue";
import AppResultsChart from "@client/components/AppResultsChart.vue";
import AppResultsNav from "@client/components/AppResultsNav.vue";
import AppResultsLoading from "@client/components/AppResultsLoading.vue";

// Test result data
import { onMounted } from "vue";
import { resultsStore } from "@client/stores/resultsStore";
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
  width: 100%;
  max-width: 1100px;
  height: 600px;
  margin: 2rem 0;
  .chart {
    margin: 0 2rem;
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
