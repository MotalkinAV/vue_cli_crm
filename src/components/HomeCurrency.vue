<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ $i18n('TextExchangeRate')}}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>{{ $i18n('TextCurrency')}}</th>
              <th>{{ $i18n('TextRate')}}</th>
              <th>{{ $i18n('TextDate')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cur in currenciesStore.getCurrencies()" :key="cur">
              <td>{{ cur }}</td>
              <td>{{ currencyFilter(currenciesStore.getCurrency(cur),cur) }}</td>
              <td>{{ dateFilter(new Date(currenciesStore.getCurrencyDate())) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { currencyFilter } from '../filters/currency.filter'
import { dateFilter } from "../filters/date.filter";
import { useCurrenciesStore } from '../store/currencies.store'

const currenciesStore = useCurrenciesStore()
</script>
