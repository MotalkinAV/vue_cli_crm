<template>
  <the-toast />
  <main-layout v-if="layout === 'main'" />
  <empty-layout v-else />
</template>

<script setup>
import { computed, onUpdated } from "vue";
import MainLayout from "./layouts/MainLayout.vue";
import EmptyLayout from "./layouts/EmptyLayout.vue";
import { useRoute } from "vue-router";
import TheToast from "./components/TheToast.vue";
import { i18n } from "./plugins/i18n.plugin";

const route = useRoute();

const layout = computed(() => route.meta.layout);

const routeTitle = computed(() => `Title${route.name}`)

onUpdated(() => {
  console.log("APP", "onUpdated", routeTitle.value)
  document.title = `${i18n(routeTitle.value)} | CRM`
})
</script>