<template>
  <div>
    <div class="page-title">
      <h3>{{ $i18n('TitleBill')}}</h3>
      <button
        class="btn waves-effect waves-light btn-small"
        @click.prevent="refresh()"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <the-loader v-if="isLoadingInfo" />

    <div v-else class="row">
      <home-bill />
      <home-currency />
    </div>
  </div>
</template>

<script setup>
import { useInfoStore } from "../store/info.store";
import HomeBill from "../components/HomeBill.vue";
import HomeCurrency from "../components/HomeCurrency.vue";
import { loadingInfo, isLoadingInfo } from "../plugins/loader.plugin";
import { AppError } from "@/utils/errors";
import router from "@/router/router";

const infoStore = useInfoStore();

const refreshInfo = infoStore.refreshInfo

async function refresh() {
  try {
    loadingInfo();
    await refreshInfo();
    router.push('/?success=bill_updated')
    loadingInfo();
  } catch (error) {
    loadingInfo();
    throw new AppError(error);
  }
}
</script>
