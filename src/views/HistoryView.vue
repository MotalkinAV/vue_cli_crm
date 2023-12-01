<template>
  <div>
    <div class="page-title">
      <h3>{{ $i18n('TitleHistory')}}</h3>
    </div>

    <the-loader v-if="isLoadingRecords" />

    <section v-else-if="records">
      <div class="history-chart">
        <canvas class="categoriesChart" ref="categoriesChart" width="600" height="400"></canvas>
      </div>
      <history-table :records="records" :categories="categories" />
    </section>

    <div v-else>
      <h5 class="center">
        {{ $i18n('TextNoRecords')}}
        <router-link to="/record"> {{ $i18n('LinkAddNewRecord')}} </router-link>
      </h5>
    </div>
  </div>
</template>

<script setup>
import HistoryTable from "@/components/HistoryTable.vue";
import TheLoader from "@/components/TheLoader.vue";
import { useCategoriesStore } from "@/store/categories.store";
import { useRecordsStore } from "@/store/records.store";
import { storeToRefs } from "pinia";
import { isLoadingRecords } from "../plugins/loader.plugin";
import Chart from "chart.js/auto";
import { onMounted, ref } from "vue";
import { currencyFilter } from "../filters/currency.filter";

const categoriesStore = useCategoriesStore();
const recordsStore = useRecordsStore();

const { records } = storeToRefs(recordsStore);
const { categories } = storeToRefs(categoriesStore);

const categoriesChart = ref();

const labels = categories.value.map((category) => category.title);

const categoriesAmount = categories.value.map((cat) => {
  return records.value
    .filter((rec) => rec.categoryId === cat.id)
    .filter((rec) => rec.type === "outcome")
    .reduce((total, record) => {
      return (total += +record.amount);
    }, 0);
});

const data = {
  labels: labels,
  datasets: [
    {
      data: categoriesAmount,
      backgroundColor: [
        "#90caf9",
        "#ef9a9a",
        "#9fa8da",
        "#80cbc4",
        "#c5e1a5",
        "#fff59d",
        "#ffcc80",
      ],
      hoverBackgroundColor: [
        "#42a5f5",
        "#ef5350",
        "#5c6bc0",
        "#26a69a",
        "#9ccc65",
        "#ffee58",
        "#ffa726",
      ],
      hoverOffset: 40,
      borderWidth: 2,
      radius: 130,
      hoverBorderWidth: 0,
      borderRadius: 4,
    },
  ],
};

const options = {
  responsive: false,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'left',
      labels: {
        boxWidth: 30,
        boxHeight: 16,
      }
    },
    tooltip: {
      enabled: true,
      caretSize: 0,
      cornerRadius: 2,
      displayColors: false,
      rtl: true,
      titleFont: {
        size: 16,
        weight: "normal",
      },
      titleAlign: "left",
      bodyFont: {
        size: 16,
      },
      bodyAlign: "left",
      callbacks: {
        label: (context) => {
          return currencyFilter(context.parsed);
        },
      },
    },
  },
};

onMounted(() => {
  new Chart(categoriesChart.value, {
    type: "doughnut",
    data: data,
    options: options,
  });
});
</script>

<style scoped>
</style>
