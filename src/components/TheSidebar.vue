<template>
  <ul class="sidenav app-sidenav" :class="{ open: isOpen }">
    <li v-for="link in links" :key="link.url">
      <router-link
        class="waves-effect pointer"
        :to="link.url"
        active-class="active"
        :exact="link.exact"
        ><i class="material-icons">{{ link.icon }}</i>{{ link.title }}
      </router-link>
    </li>
  </ul>
</template>

<script setup>
import { isOpen } from '../plugins/show.navbar.plugin'
import { links } from '../links/app.links'
</script>

<style scoped>
.material-icons {
  margin-right: 0.5rem !important;
}
</style>
