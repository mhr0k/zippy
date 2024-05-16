<template>
  <dialog ref="dialog">
    <span>Oh no! It seems that you stopped typing.</span
    ><span> The test has been reset.</span>
    <button @click="close">Close</button>
  </dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import { useInputStore } from "@/stores/inputStore";
const inputStore = useInputStore();
const dialog = ref();
const close = () => {
  dialog.value.close();
  inputStore.abandoned = false;
};

// Show modal when the test is abandoned
watch(
  () => inputStore.abandoned,
  () => {
    if (inputStore.abandoned) {
      dialog.value.showModal();
    }
  }
);
</script>

<style scoped lang="postcss">
dialog[open] {
  border: none;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  place-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: var(--bg-lighter);
  color: var(--text-dark);
  font-family: var(--accent-font);
  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }
  button {
    width: max-content;
    padding: 0.5rem 1rem;
    border: none;
    background-color: var(--primary);
    color: var(--text);
    cursor: pointer;
    margin-top: 0.5rem;
  }
}
</style>
