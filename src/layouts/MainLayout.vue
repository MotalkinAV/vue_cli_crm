<template>
  <div v-if="isLoading" class="grey darken-1 empty-layout">
    <the-loader/>
  </div>

  <div v-else :class="isDark ? 'dark-mode' : 'light-mode'">
    <div class="app-main-layout">
      <the-navbar />
      <the-sidebar />

      <main class="app-content container" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          class="btn-floating btn-large blue lighten-1 waves-effect"
          to="/record"><i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
    <the-footer />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import TheNavbar from "@/components/TheNavbar.vue";
import TheSidebar from "@/components/TheSidebar.vue";
import TheFooter from "@/components/TheFooter.vue";
import { useCategoriesStore } from "@/store/categories.store";
import { isOpen } from "../plugins/show.navbar.plugin";
import { loading, loadingRecords, loadingCategories, isLoading } from "../plugins/loader.plugin";
import { useCurrenciesStore } from "@/store/currencies.store";
import { useRecordsStore } from "@/store/records.store";
import { AppError } from "@/utils/errors";
import { useInfoStore } from "@/store/info.store";
import { isDark } from '../use/use.dark.mode'


const categoriesStore = useCategoriesStore();
const currenciesStore = useCurrenciesStore();
const recordsStore = useRecordsStore();
const infoStore = useInfoStore()

const fetchCurrency = currenciesStore.fetchCurrency;
const downloadCategories = categoriesStore.downloadCategories;
const downloadRecords = recordsStore.downloadRecords;
const refreshInfo = infoStore.refreshInfo

onMounted(async () => {
  try {
    loading();
    loadingRecords();
    loadingCategories();

    await refreshInfo()
    await fetchCurrency();

    downloadCategories();
    
    loadingCategories();

    downloadRecords();

    loadingRecords();
    loading();
  } catch (error) {
    loading();
    loadingRecords();
    loadingCategories();
    throw new AppError(error);
  }
});
</script>

<style lang="sass">
@import '@/assets/dark-mode.scss'
@import '@/assets/light-mode.scss'
</style>
