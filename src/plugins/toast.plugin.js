import router from "@/router/router";
import { computed, ref, watch } from "vue";

const messages = computed(() => router.currentRoute.value.query);

watch(messages, (newValue) => {
  toastPlugin(newValue);
});

const toasts = ref([]);

function toastPlugin(value) {
  if (value.success) {
    toasts.value.push({
      type: "success",
      message: `ToastMessage: ${value.success}`,
      icon: "done",
    });
  }
  if (value.error) {
    toasts.value.push({
      type: "error",
      message: `ToastMessage: ${value.error}`,
      icon: "clear",
    });
  }
  if (value.info) {
    toasts.value.push({
      type: "info",
      message: `ToastMessage: ${value.info}`,
      icon: "info",
    });
  }
  if (value.warning) {
    toasts.value.push({
      type: "warning",
      message: `ToastMessage: ${value.warning}`,
      icon: "warning",
    });
  }
  setTimeout(() => {
    toasts.value.splice(0, 1);
  }, 4000);
}

export { toastPlugin, toasts };
