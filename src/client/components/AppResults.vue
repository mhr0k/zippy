<template>
  <section>
    <ul class="chart-views">
      <li
        tabindex="0"
        role="button"
        @click="view = 'cpm'"
        :class="{ active: view === 'cpm' }"
        :aria-current="view === 'cpm' || null"
      >
        chars/min
      </li>
      <li
        tabindex="0"
        role="button"
        @click="view = 'wpm'"
        :class="{ active: view === 'wpm' }"
        :aria-current="view === 'wpm' || null"
      >
        words/min
      </li>
      <li
        tabindex="0"
        role="button"
        @click="view = 'acc'"
        :class="{ active: view === 'acc' }"
        :aria-current="view === 'acc' || null"
      >
        accuracy
      </li>
    </ul>
    <AppResultsChart :view />
  </section>
</template>

<script setup>
import AppResultsChart from "@client/components/AppResultsChart.vue";

// Chart view selection
import { ref } from "vue";
const view = ref("wpm");
</script>

<style scoped lang="postcss">
section {
  display: flex;
  place-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  margin: 2rem 0;
  .chart-views {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    li {
      font-weight: 300;
      list-style-type: none;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      cursor: pointer;
      background-color: var(--bg-lighter);
      &:hover,
      &:focus {
        transform: scale(1.05);
      }
      &.active {
        background-color: var(--primary);
      }
    }
  }
}
</style>
