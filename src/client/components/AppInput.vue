<template>
  <div class="test-wrapper">
    <Transition appear name="fade">
      <AppInputPrompt v-if="session.ready" class="test-prompt" />
    </Transition>
    <article @click="handleClickOnInput">
      <div class="test-leftPane">
        <span
          v-for="typed in wordStore.typed"
          :key="typed"
          :class="{ miss: typed.missed }"
          >{{ typed.word }}
        </span>
        <span
          @keydown="handleTyping"
          @keydown.delete.prevent="handleDelete"
          @keydown.space.prevent="handleSpace"
          @keyup.esc.prevent="handleEscape"
          class="test-currentSpan"
          :class="{
            miss: wordStore.currentInputIsMistyped,
            idle: !wordStore.typing,
            timeout: session.timeout,
          }"
          ref="input"
          contenteditable="true"
          spellcheck="false"
          autocapitalize="off"
          autocorrect="off"
          tabindex="0"
          >{{ wordStore.currentInput }}</span
        >
      </div>
      <div class="test-rightPane">
        <span v-for="word in wordStore.queue" :key="word">
          {{ word }}
        </span>
      </div>
    </article>
  </div>
</template>

<script setup>
import AppInputPrompt from "@client/components/AppInputPrompt.vue";
import { ref, watch, onMounted } from "vue";
import { focusAtEnd } from "@client/utils";

// State
import { useWordStore } from "@client/stores/wordStore";
import { useTestSessionStore } from "@client/stores/testSessionStore";
const session = useTestSessionStore();
const wordStore = useWordStore();
const input = ref();

// Events
const handleClickOnInput = () => focusAtEnd(input.value);
const handleEscape = () => session.cancel();
const handleTyping = (e) => wordStore.processInput(e);
const handleDelete = (e) => wordStore.processDelete(e);
const handleSpace = () => wordStore.nextWord();
// Restore right pane string on deleting input
watch(
  () => wordStore.currentInput,
  (newValue, oldValue) => {
    if (newValue.length < oldValue.length) {
      wordStore.restoreQueueString();
    }
  }
);

// Autofocus
onMounted(() => focusAtEnd(input.value));
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
  height: 8rem;
  width: 80%;
  font-size: 2rem;
  border-radius: 0.5rem;
  border: none;
  outline: none;
  box-shadow: 0px 3px 2rem rgba(0, 0, 0, 0.2);
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
    color: var(--text-light);
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
    color: var(--primary);
    caret-color: transparent;
    &:focus {
      margin-right: -1px;
      border-right: 1px solid var(--primary);
    }
    &.idle {
      animation: caret-blink 1s step-end infinite;
    }
    &.timeout {
      border-color: transparent !important;
    }
  }
  .miss {
    text-decoration: line-through;
    color: var(--text-light);
  }
}
@keyframes caret-blink {
  50% {
    border-color: transparent;
  }
}
</style>
