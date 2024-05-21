<template>
  <div v-if="status === 'loading'" class="jump">
    <span style="--i: 1">L</span>
    <span style="--i: 2">o</span>
    <span style="--i: 3">a</span>
    <span style="--i: 4">d</span>
    <span style="--i: 5">i</span>
    <span style="--i: 6">n</span>
    <span style="--i: 8">g</span>
    <span>&nbsp;</span>
    <span style="--i: 9">r</span>
    <span style="--i: 10">e</span>
    <span style="--i: 11">s</span>
    <span style="--i: 12">u</span>
    <span style="--i: 13">l</span>
    <span style="--i: 14">t</span>
    <span style="--i: 15">s</span>
    <span style="--i: 16">.</span>
    <span style="--i: 17">.</span>
    <span style="--i: 18">.</span>
  </div>
  <div v-if="status === 'timeout'">
    <span>Oops, this is taking longer than expected.</span>
  </div>
  <div v-if="status === 'error'">
    <span
      >Something went wrong while fetching the results.<br />
      Please try visiting the page later.</span
    >
  </div>
</template>

<script setup>
defineProps(["status"]);
</script>

<style scoped lang="postcss">
div {
  margin-top: 2rem;
  span {
    font-size: 1.2rem;
    font-weight: 300;
    @media (width <= 768px) {
      font-size: 1rem;
    }
  }
  &.jump span {
    position: relative;
    display: inline-block;
    animation: jump 1s infinite;
    animation-delay: calc(0.04s * var(--i));
  }
}
@keyframes jump {
  0%,
  40%,
  100% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(-0.1rem);
  }
}
</style>
