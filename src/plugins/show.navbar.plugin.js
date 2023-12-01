import { ref } from "vue";

export const isOpen = ref(false);

export function showNavbar() {
  isOpen.value = !isOpen.value
}