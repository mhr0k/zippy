<template>
  <div v-if="loading" class="jump">
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
  <div v-if="!loading">
    <span>Oops! Something went wrong while loading the results.</span>
  </div>
</template>

<script setup>
defineProps(["loading"]);
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
