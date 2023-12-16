<template>
  <ul class="sidenav app-sidenav" :class="{ open: isOpen }">
    <li v-for="link in links" :key="link.url">
      <router-link
        class="waves-effect pointer sidenav-links"
        :to="link.url"
        active-class="active"
        :exact="link.exact"
        ><i class="material-icons sidenav-icon">{{ link.icon }}</i>{{ link.title }}
      </router-link>
    </li>
    <li>
    <div class="switch theme-switch">
      <i class="theme-switch-icon material-icons tiny">brightness_high</i>
      <label class="theme-switch-label">
        <input type="checkbox" v-model="isDark"/>
        <span class="lever"></span>
      </label>
      <i class="theme-switch-icon material-icons tiny">brightness_3</i>
    </div>
    </li>
  </ul>
</template>

<script setup>
import { isOpen } from '../plugins/show.navbar.plugin'
import { links } from '../use/use.links'
import { isDark } from '../use/use.dark.mode'
</script>
