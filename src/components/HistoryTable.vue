<template>
  <table>
    <thead>
      <tr class="table-row">
        <th style="width: 5rem">#</th>
        <th
          v-for="tableTitle in tableTitles"
          :key="tableTitle"
          style="width: 20rem"
        >
          <a
            class="sort-title"
            style="cursor: pointer"
            @click.prevent="sortTable(tableTitle.type)"
            >{{ $i18n(tableTitle.title) }}
            <i class="tiny material-icons sort-icon">{{
              sortOptions.order === "asc" && sortOptions.key === tableTitle.type
                ? "arrow_upward"
                : sortOptions.order === "desc" && sortOptions.key === tableTitle.type
                ? "arrow_downward"
                : "import_export"
            }}</i>
          </a>
        </th>
        <th style="width: 5rem">{{ $i18n("TextDetails") }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, idx) in historyRecords" :key="record.id" class="table-row">
        <td>{{ idx + 1 }}</td>
        <td>{{ currencyFilter(record.amount) }}</td>
        <td>{{ dateFilterShort(new Date(record.date)) }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span
            class="white-text new badge"
            :data-badge-caption="$i18n(`${record.typeText}`)"
            :class="record.typeClass"
          />
        </td>
        <td>
          <button
            v-tooltip="$i18n('TextShowRecord')"
            class="btn-small btn"
            @click="router.push('/detail/' + record.id)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <the-pagination
    :allPages="countHistoryRecordsPages"
    @changeArrayIndex="newHistoryRecordsIdx"
  />
</template>

<script setup>
import router from "@/router/router";
import { currencyFilter } from "../filters/currency.filter";
import { dateFilterShort } from "../filters/date.filter.js";
import { computed, ref, defineProps, onMounted } from "vue";

const props = defineProps(["records", "categories"]);

const records = ref(props.records);

const pageSize = 5;

const historyRecords = ref();

const currentPage = ref(0);

const sortOptions = ref({
  key: null,
  order: "asc",
});

const tableTitles = ref([
  { title: "TextAmount", type: "amount" },
  { title: "TextDate", type: "date" },
  { title: "TextCategory", type: "categoryId" },
  { title: "TextType", type: "type" },
]);

const countHistoryRecordsPages = computed(() => {
  return Math.ceil(convertedRecords.value.length / pageSize);
});

const convertedRecords = computed(() => {
  return records.value.map((record) => {
    return {
      ...record,
      categoryName: props.categories.find(
        (category) => category.id === record.categoryId
      ).title,
      typeClass: record.type === "income" ? "green" : "red",
      typeText: record.type === "income" ? "TextIncome" : "TextOutcome",
    };
  });
});

const newHistoryRecordsIdx = (idx) => {
  currentPage.value = idx;
  refreshHistoryRecords(idx);
}

const sortTable = (key) => {
  if (sortOptions.value.key === key) {
    sortOptions.value.order =
      sortOptions.value.order === "asc" ? "desc" : "asc";
  } else {
    sortOptions.value.key = key;
    sortOptions.value.order = "asc";
  }
  console.log(sortOptions.value);

  console.log(records.value);
  records.value = Array.from(props.records).sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    if (typeof valueA === "string") {
      return sortOptions.value.order === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else {
      return sortOptions.value.order === "asc"
        ? valueA - valueB
        : valueB - valueA;
    }
  });
  refreshHistoryRecords(currentPage.value);
}

const refreshHistoryRecords = (recordsIdx = 0) => {
  historyRecords.value = Array.from(
    { length: countHistoryRecordsPages.value },
    (v, i) =>
      convertedRecords.value.slice(i * pageSize, i * pageSize + pageSize)
  )[recordsIdx];
}

onMounted(() => {
  refreshHistoryRecords();
});
</script>
