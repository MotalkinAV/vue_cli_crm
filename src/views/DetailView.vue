<template>
  <div>
        <div class="page-title">
      <h3>{{ $i18n('TitleDetail')}}</h3>
        </div>
    <the-loader v-if="isLoadingRecords" />
    <div v-else>
      <div class="breadcrumb-wrap">
        <router-link :to="'/history'" class="breadcrumb">{{ $i18n('TitleHistory')}}</router-link>
        <a @click.prevent class="breadcrumb"> {{ $i18n(recordDetail.typeText)}} </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="recordDetail.typeClass">
            <div class="card-content white-text">
              <p>{{ `${$i18n('TextDescription')}:`}} {{ recordDetail.description }}</p>
              <p>{{ `${$i18n('TextAmount')}:`}} {{ currencyFilter(recordDetail.amount) }}</p>
              <p>{{ `${$i18n('TextCategory')}:`}} {{ recordDetail.categoryName }}</p>

              <small
                >{{ dateFilterShort(new Date(recordDetail.date)) }}
                {{ timeFilter(new Date(recordDetail.date)) }}</small
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCategoriesStore } from "@/store/categories.store";
import { useRecordsStore } from "@/store/records.store";
import { AppError } from "@/utils/errors";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { currencyFilter } from "../filters/currency.filter";
import { dateFilterShort, timeFilter } from "../filters/date.filter.js";
import { loadingRecords, isLoadingRecords } from "../plugins/loader.plugin";

const recordsStore = useRecordsStore();
const categoriesStore = useCategoriesStore();

const downloadRecordById = recordsStore.downloadRecordById;
const downloadCategoryById = categoriesStore.downloadCategoryById;

const route = useRoute();

const recordDetail = ref(null);

onMounted(async () => {
  try {
    loadingRecords();

    const record = await downloadRecordById(route.params.id);
    const category = await downloadCategoryById(record.categoryId);
    recordDetail.value = {
      ...record,
      categoryName: category.title,
      typeClass: record.type === "income" ? "green" : "red",
      typeText: record.type === "income" ? "TextIncome" : "TextOutcome",
    };
    console.log("DETAIL VIEW", "onMounted", recordDetail.value);

    loadingRecords();
  } catch (error) {
    loadingRecords();
    throw new AppError(error);
  }
});
</script>
