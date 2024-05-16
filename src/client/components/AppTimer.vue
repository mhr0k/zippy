<template>
  <div id="timer">
    <circle-progress :value :max anticlockwise />
    <div>
      <span>{{ value }}</span>
      <span>seconds</span>
    </div>
  </div>
</template>

<script setup>
import "js-circle-progress";
defineProps({
  value: { type: Number, default: 0 },
  max: { type: Number, default: 60 },
});
</script>

<style scoped lang="postcss">
#timer {
  --size: 2rem;
  @media (width <= 768px) {
    --size: 1.4rem;
  }
  background: var(--bg-lighter);
  height: calc(3.8 * var(--size));
  width: calc(3.8 * var(--size));
  border-radius: 50%;
  position: relative;
  circle-progress {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &::part(text) {
      display: none;
    }
    &::part(base) {
      width: calc(4.2 * var(--size));
      height: calc(4.2 * var(--size));
    }
    &::part(value) {
      stroke: var(--primary);
    }
    &::part(circle) {
      stroke: transparent;
    }
  }
  div {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    span:first-child {
      display: block;
      font-weight: bold;
      font-size: var(--size);
    }
    span:last-child {
      font-size: 0.8rem;
    }
  }
}
</style>
