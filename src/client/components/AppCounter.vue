<template>
  <div>
    <div id="counter">
      <Transition appear name="counter" mode="out-in">
        <span :key="value">{{ value }}</span>
      </Transition>
    </div>
    <label for="counter">{{ label }}</label>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String },
  value: { type: Number, default: 0 },
});
</script>

<style scoped lang="postcss">
#counter {
  --size: 2rem;
  @media (width <= 768px) {
    --size: 1.4rem;
  }
  background-color: var(--bg-lighter);
  height: calc(3 * var(--size));
  width: calc(3 * var(--size));
  border-radius: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  & span {
    font-weight: bold;
    font-size: var(--size);
  }
}
label {
  display: inline-block;
  text-align: center;
  width: 100%;
  margin-top: 0.8rem;
  font-size: 0.8rem;
}

/* Transitions */
.counter-enter-active,
.counter-leave-active {
  transition: all 0.1s ease-in-out;
}
.counter-enter-from {
  transform: translateY(-1rem);
  opacity: 0;
}
.counter-leave-to {
  transform: translateY(0.5rem);
  opacity: 0;
}
</style>
