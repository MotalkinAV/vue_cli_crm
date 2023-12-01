<template>
  <div class="grey darken-1 empty-layout">
    <the-loader v-if="isLoading"/>
    <router-view v-else />
  </div>
</template>

<script setup>
import { isLoading } from '../plugins/loader.plugin'
</script>

