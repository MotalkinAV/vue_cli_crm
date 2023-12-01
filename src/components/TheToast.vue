<template>
  <TransitionGroup class="toast-wrapper" name="toast" tag="ul">
    <li
      v-for="toast in toasts"
      :key="toast"
      class="toast-message"
      :class="toast.type"
    >
      <i class="material-icons">{{ toast.icon }}</i>
      <p class="toast-content">
        {{ $i18n(toast.message) }}
      </p>
    </li>
  </TransitionGroup>
</template>

<script setup>
import { toasts } from '../plugins/toast.plugin' 
</script>

<style scoped>
.toast-move,
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(100%);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.toast-leave-active {
  position: absolute;
}

.toast-wrapper {
  z-index: 1000;
  position: fixed;
  top: 3rem;
  right: 1rem;
  min-width: 15%;
}
.toast-message {
  margin-top: 1rem;
  border-radius: 2px;
  width: auto;
  max-width: 100%;
  min-width: 300px;
  height: auto;
  min-height: 4rem;
  background-color: #323232;
  padding: 10px 5px;
  font-size: 1.1rem;
  font-weight: 300;
  color: #fff;
  display: flex;
  align-items: center;
  cursor: default;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
}
.success {
  border-left: 8px solid #47d764;
}
.error {
  border-left: 8px solid #ff355b;
}
.info {
  border-left: 8px solid #2f86eb;
}
.warning {
  border-left: 8px solid #ffc021;
}
.toast-content {
  display: block;
  margin-block: 0;
  margin-inline: 2rem;
}
</style>
