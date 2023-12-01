<template>
  <the-toast />
  <main-layout v-if="layout === 'main'" />
  <empty-layout v-else />
</template>

<script setup>
import { computed } from "vue";
import MainLayout from "./layouts/MainLayout.vue";
import EmptyLayout from "./layouts/EmptyLayout.vue";
import { useRoute } from "vue-router";
import TheToast from "./components/TheToast.vue";

const route = useRoute();

const layout = computed(() => route.meta.layout);
</script>
