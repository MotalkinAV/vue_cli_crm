<template>
  <nav class="navbar">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="showNavbar()">
          <i class="material-icons navbar-text">dehaze</i>
        </a>
        <span class="navbar-text"
          >{{ dateFilter(date) }} {{ timeFilter(date) }}</span
        >
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger navbar-text profile"
            href="#"
            data-target="dropdown"
            ref="dropdown"
            >{{ info.value.name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="dropdown-text">
                <i class="material-icons">account_circle</i>
                {{ $i18n('LinkProfile')}}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a class="dropdown-text" @click.prevent="logout()">
                <i class="material-icons">assignment_return</i>
                {{ $i18n('LinkExit')}}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { dateFilter, timeFilter } from "../filters/date.filter.js";
import M from "../../node_modules/materialize-css/dist/js/materialize.min";
import { useAuthStore } from "../store/auth.store";
import { useInfoStore } from "@/store/info.store.js";
import router from "@/router/router.js";
import { showNavbar } from "../plugins/show.navbar.plugin";
import { storeToRefs } from "pinia";


const authStore = useAuthStore();
const infoStore = useInfoStore();

const {info} = storeToRefs(infoStore)

const date = ref(new Date());
const dropdown = ref();
const interval = ref(null);

function logout() {
  authStore.logout();
  router.push("/login?info=logout");
}

onMounted(() => {
  interval.value = setInterval(() => {
    date.value = new Date();
  }, 1000);

  setTimeout(() => {
    M.Dropdown.init(dropdown.value, { coverTrigger: false });
  }, 0);
});
</script>

<style scoped>
.navbar{
  position: fixed;
}
.profile {
  padding-inline: 3rem;
}
</style>
