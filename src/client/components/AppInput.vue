<template>
  <div class="test-wrapper">
    <Transition appear name="fade">
      <AppInputPrompt v-if="session.ready" class="test-prompt" />
    </Transition>
    <article @click="handleClickOnInput">
      <div class="test-leftPane">
        <span
          v-for="typed in inputStore.typed"
          :key="typed"
          :class="{ miss: typed.missed }"
          >{{ typed.word }}
        </span>
        <span
          @input="handleInput"
          @keydown.enter.prevent
          @keydown.space.prevent="handleSpace"
          @keyup.esc="handleEscape"
          class="test-currentSpan"
          :class="{
            miss: !inputStore.isCorrect,
          }"
          ref="input"
          :contenteditable="!session.timeout"
          spellcheck="false"
          autocapitalize="off"
          autocorrect="off"
          tabindex="0"
          autofocus
        ></span>
      </div>
      <div class="test-rightPane">
        <span v-for="word in inputStore.queue" :key="word + Math.random()">
          {{ word }}
        </span>
      </div>
    </article>
  </div>
</template>

<script setup>
import AppInputPrompt from "@/components/AppInputPrompt.vue";
import { ref } from "vue";

// State
import { useInputStore } from "@/stores/inputStore";
import { useSessionStore } from "@/stores/sessionStore";
const session = useSessionStore();
const inputStore = useInputStore();
const input = ref();

// Events
const handleClickOnInput = () => input.value.focus();
const handleEscape = () => session.cancel();
const handleInput = (e) => inputStore.processInput(e);
const handleSpace = () => {
  input.value.innerText = "";
  inputStore.nextWord();
};
</script>

<style scoped lang="postcss">
.test-wrapper {
  position: relative;
  width: 100%;
  .test-prompt {
    position: absolute;
    top: 0;
    left: 50%;
    translate: -50% -90%;
    z-index: 1000;
    pointer-events: none;
    &.fade-enter-active,
    &.fade-leave-active {
      transition: opacity 0.3s ease;
    }
    &.fade-enter-from,
    &.fade-leave-to {
      opacity: 0;
    }
  }
}

article {
  position: relative;
  --test-spacing: 0.5rem;
  background-color: var(--bg-lighter);
  height: 8rem;
  width: 80%;
  @media (width <= 768px) {
    width: 90%;
  }
  font-size: 2rem;
  border-radius: 0.5rem;
  border: none;
  outline: none;
  box-shadow: 0px 3px 2rem rgba(0, 0, 0, 0.2);
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 10%;
    height: 80%;
    width: 5rem;
    background: linear-gradient(to left, transparent, var(--bg-lighter));
    pointer-events: none;
  }
  &::before {
    content: "";
    position: absolute;
    right: 0;
    top: 10%;
    height: 80%;
    width: 5rem;
    background: linear-gradient(to right, transparent, var(--bg-lighter));
    pointer-events: none;
  }
  font-family: var(--accent-font);
  font-weight: 300;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(2, 50%);
  text-wrap: nowrap;
  margin: 0 auto;
  .test-leftPane {
    display: flex;
    justify-content: end;
    align-items: center;
    text-align: end;
    gap: var(--test-spacing);
    color: var(--text-faded);
  }
  .test-rightPane {
    overflow: hidden;
    display: flex;
    justify-content: start;
    align-items: center;
    text-align: start;
    gap: var(--test-spacing);
  }
  .test-currentSpan {
    outline: none;
    color: var(--secondary);
  }
  .miss {
    text-decoration: line-through;
    color: var(--text-faded);
  }
}
</style>
