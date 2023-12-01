<template>
  <div>
    <div class="page-title">
      <h3>{{ $i18n('TitleCategories')}}</h3>
    </div>

    <the-loader v-if="isLoadingCategories" />
    
    <section v-else>
      <div class="row">
        <category-create />
        <category-edit v-if="categories.length"/>
      </div>
    </section>
  </div>
</template>

<script setup>
import CategoryCreate from "../components/CategoryCreate.vue";
import CategoryEdit from "../components/CategoryEdit.vue";
import { isLoadingCategories } from '../plugins/loader.plugin'
import { useCategoriesStore } from "@/store/categories.store";
import { storeToRefs } from "pinia";

const categoriesStore = useCategoriesStore();
const { categories } = storeToRefs(categoriesStore)
</script>
