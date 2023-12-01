import { ref } from "vue";

const isLoading = ref(false)

function loading() {
  isLoading.value = !isLoading.value
}

const isLoadingRecords = ref(false)

function loadingRecords() {
  isLoadingRecords.value = !isLoadingRecords.value
}

const isLoadingCategories = ref(false)

function loadingCategories() {
  isLoadingCategories.value = !isLoadingCategories.value
}

const isLoadingInfo = ref(false)

function loadingInfo() {
  isLoadingInfo.value = !isLoadingInfo.value
}

export {
  isLoading,
  isLoadingRecords,
  isLoadingCategories,
  isLoadingInfo,
  loading,
  loadingRecords,
  loadingCategories,
  loadingInfo,
}