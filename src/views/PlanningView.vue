<template>
  <div>
    <div class="page-title">
      <h3>{{ $i18n('TitlePlanning')}}</h3>
      <h4>{{ currencyFilter(getBill()) }}</h4>
    </div>

    <the-loader v-if="isLoadingRecords" />

    <div v-else-if="!categories.length">
      <h5 class="center">
        {{ $i18n('TextNoCategories')}}
        <router-link to="/categories"> {{ $i18n('LinkAddNewCategory')}} </router-link>
      </h5>
    </div>

    <section v-else>
      <div v-tooltip="cat.tooltipTitle" v-for="cat in categoriesPlaning" :key="cat.id">
        <p>
          <strong>{{ cat.title }}</strong>
          {{ currencyFilter(cat.spand) }} {{ $i18n('TextOutOf')}} {{ currencyFilter(cat.limit) }}
        </p>
        <div class="progress">
          <div
            class="determinate"
            :class="cat.progressColor"
            :style="`width: ${cat.progressPrecent}%`"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useCategoriesStore } from "@/store/categories.store";
import { useInfoStore } from "@/store/info.store";
import { storeToRefs } from "pinia";
import { isLoadingRecords } from "../plugins/loader.plugin";
import { currencyFilter } from "../filters/currency.filter";
import { onBeforeMount, ref } from "vue";
import { useRecordsStore } from "@/store/records.store";

const categoriesStore = useCategoriesStore();
const infoStore = useInfoStore();
const recordsStore = useRecordsStore();

const { records } = storeToRefs(recordsStore);
const { categories } = storeToRefs(categoriesStore);
const getBill = infoStore.getBill;

const categoriesPlaning = ref([]);

onBeforeMount(() => {
  console.log("PLANNING VIEW", "onBeforeMount");
  categoriesPlaning.value = categories.value.map((cat) => {
    const spand = records.value
      .filter((rec) => rec.categoryId === cat.id)
      .filter((rec) => rec.type === "outcome")
      .reduce((total, record) => {
        return (total += +record.amount);
      }, 0);

    const percent = (100 * spand) / cat.limit;
    const progressPrecent = percent > 100 ? 100 : percent;
    const progressColor =
      percent < 60 ? "green" : percent < 100 ? "yellow" : "red";
    const tooltipValue = cat.limit - spand
    const tooltipTitle = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось '} ${currencyFilter(Math.abs(tooltipValue))}`

    return {
      ...cat,
      spand,
      progressColor,
      progressPrecent,
      tooltipTitle,
    };
  });
});
</script>
