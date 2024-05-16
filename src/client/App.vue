<template>
  <main>
    <h1>Typing speed test</h1>
    <h2>Test your typing skills</h2>
    <div class="numerics">
      <section class="counters">
        <AppCounter :value="session.score.wpm" label="words/min" />
        <AppCounter :value="session.score.cpm" label="chars/min" />
        <AppCounter :value="session.score.acc" label="% accuracy" />
      </section>
      <AppTimer
        class="timer"
        :key="session.key"
        :value="session.timeLeft"
        :max="session.timeLimit"
      />
    </div>
    <AppInput :key="session.key" />
    <AppResults />
    <AppModalAbandon />
  </main>
</template>

<script setup>
import AppCounter from "@/components/AppCounter.vue";
import AppTimer from "@/components/AppTimer.vue";
import AppInput from "@/components/AppInput.vue";
import AppResults from "@/components/AppResults.vue";
import AppModalAbandon from "./components/AppModalAbandon.vue";

import { useSessionStore } from "@/stores/sessionStore";
const session = useSessionStore();
import { useInputStore } from "@/stores/inputStore";
const inputStore = useInputStore();

import { onMounted } from "vue";
onMounted(() => inputStore.reset());
</script>

<style scoped lang="postcss">
main {
  display: flex;
  flex-direction: column;
  place-items: center;
  margin-top: 100px;
  text-align: center;
  h1 {
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: 300;
    letter-spacing: 0.05em;
  }
  h2 {
    font-size: var(--heading);
    font-weight: bold;
    margin: 0 auto 3rem;
  }
  .numerics {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    gap: 3rem;
    margin-bottom: 5rem;
    @media (width <= 768px) {
      flex-direction: column;
      gap: 2rem;
    }
    .counters {
      display: flex;
      gap: 1rem;
    }
  }
}
</style>
