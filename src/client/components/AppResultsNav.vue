<template>
  <ul class="chart-views">
    <li
      tabindex="0"
      role="button"
      @click="$emit('update:view', 'cpm')"
      :class="{ active: view === 'cpm' }"
      :aria-current="view === 'cpm' || null"
    >
      chars/min
    </li>
    <li
      tabindex="0"
      role="button"
      @click="$emit('update:view', 'wpm')"
      :class="{ active: view === 'wpm' }"
      :aria-current="view === 'wpm' || null"
    >
      words/min
    </li>
    <li
      tabindex="0"
      role="button"
      @click="$emit('update:view', 'acc')"
      :class="{ active: view === 'acc' }"
      :aria-current="view === 'acc' || null"
    >
      accuracy
    </li>
  </ul>
</template>

<script setup>
defineProps(["view"]);
</script>

<style scoped lang="postcss">
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
</style>
