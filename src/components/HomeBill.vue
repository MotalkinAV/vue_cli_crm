<template>
  <div class="col s12 m6 l4">
    <div class="card bill-card">
      <div class="card-content">
        <span class="card-title">{{ $i18n('TextCurrencyAccount')}}</span>
        <p v-for="cur in currenciesStore.getCurrencies()" :key="cur" class="currency-line">
          <span>{{currencyFilter(currenciesStore.getMulticurrencyBill(infoStore.getBill(),cur),cur)}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { currencyFilter } from '../filters/currency.filter'
import { useInfoStore } from "@/store/info.store";
import { useCurrenciesStore } from '../store/currencies.store'

const infoStore = useInfoStore()
const currenciesStore = useCurrenciesStore()
</script>
