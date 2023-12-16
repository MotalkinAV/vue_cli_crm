<template>
  <div>
    <ul class="pagination">
      <li :class="previewBtnClass">
        <a class="pagination-item" @click.prevent="previewPage()"
          ><i class="material-icons">chevron_left</i></a
        >
      </li>
      <li v-if="showPreviewBtnSection" class="waves-effect">
        <a class="pagination-item" @click.prevent="previewButtonSection()">...</a>
      </li>
      <li v-else class="pagination-item"></li>
      <li
        v-for="page in activeBtnsArray"
        :key="page"
        class="waves-effect pagination-item"
        :class="{ active: activeBtn === page }"
      >
        <a class="pagination-item" @click.prevent="thisPage(page)">{{ page }}</a>
      </li>
      <li v-if="showNextBtnSection" class="waves-effect">
        <a class="pagination-item" @click.prevent="nextButtonSection()">...</a>
      </li>
      <li
        v-else
        class="pagination-item"
        v-for="BtnSpace in nonBtnSpace"
        :key="BtnSpace"
      ></li>
      <li :class="nextBtnClass">
        <a class="pagination-item" @click.prevent="nextPage()"
          ><i class="material-icons">chevron_right</i></a
        >
      </li>
    </ul>
  </div>
</template>

<script setup>
import router from "@/router/router";
import { computed, ref, watch, defineProps, defineEmits } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const props = defineProps(["allPages"]);
const emits = defineEmits(["changeArrayIndex"]);

const allBtns = ref(props.allPages);

const activeBtn = ref(+route.query.page || 1);

const activeBtnSection = ref(0);

const btnSectionSize = computed(() => {
  return allBtns.value < 5 ? allBtns.value : 5;
});

const activeBtnsArray = computed(() => {
  return allBtnSections.value[activeBtnSection.value];
});

const allBtnsArray = computed(() => {
  return Array.from({ length: allBtns.value }, (_, index) => index + 1);
});

const allBtnSections = computed(() => {
  return Array.from(
    { length: Math.ceil(allBtns.value / btnSectionSize.value) },
    (v, i) =>
      allBtnsArray.value.slice(
        i * btnSectionSize.value,
        i * btnSectionSize.value + btnSectionSize.value
      )
  );
});

const previewBtnClass = computed(() => {
  return activeBtn.value === 1 ? "disabled" : "waves-effect";
});

const nextBtnClass = computed(() => {
  return activeBtn.value === allBtns.value ? "disabled" : "waves-effect";
});

const showPreviewBtnSection = computed(() => {
  return activeBtnSection.value === 0 ? false : true;
});

const showNextBtnSection = computed(() => {
  return activeBtnSection.value === allBtnSections.value.length - 1
    ? false
    : true;
});

const nonBtnSpace = computed(() => {
  return (
    btnSectionSize.value +
    1 -
    allBtnSections.value[activeBtnSection.value].length
  );
});

function previewPage() {
  activeBtn.value === 1 ? false : activeBtn.value--;
}

function nextPage() {
  activeBtn.value === allBtns.value ? false : activeBtn.value++;
}

function thisPage(value) {
  activeBtn.value = value;
}

function previewButtonSection() {
  activeBtnSection.value === 0 ? false : activeBtnSection.value--;
  activeBtn.value = activeBtnsArray.value[btnSectionSize.value - 1];
}

function nextButtonSection() {
  activeBtnSection.value === allBtnSections.value.length - 1
    ? false
    : activeBtnSection.value++;
  activeBtn.value = activeBtnsArray.value[0];
}

watch(activeBtn, (value) => {
  activeBtnSection.value = allBtnSections.value.findIndex(
    (subArray) => subArray.indexOf(value) !== -1
  );

  emits("changeArrayIndex", activeBtn.value - 1);

  router.push(`${route.path}?page=${activeBtn.value}`);
});
</script>

<style scoped>
.pagination-item {
  width: 3rem;
}
</style>
