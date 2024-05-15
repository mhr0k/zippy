<template>
  <div>
    <div class="input-prompt">
      <span>Start typing</span>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.input-prompt {
  position: relative;
  margin-bottom: -0.5rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.13);
  z-index: 300;
  background-color: var(--primary);
  height: 2rem;
  font-size: 1rem;
  padding: 0 1rem;
  display: flex;
  place-items: center;
  animation: jump 0.5s infinite alternate;
  & span {
    z-index: 400;
  }
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    width: 12px;
    height: 12px;
    background-color: inherit;
    box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.055);
  }
}
@keyframes jump {
  from {
    transform: translateY(-5%);
  }
  to {
    transform: translateY(5%);
  }
}
</style>
