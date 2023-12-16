<template>
  <div class="col s12 m6 l8">
    <div class="card currency-card">
      <div class="card-content">
        <div class="card-header">
          <span class="card-title">{{ $i18n('TextExchangeRate')}}</span>
        </div>
        <table>
          <thead>
            <tr class="table-row">
              <th>{{ $i18n('TextCurrency')}}</th>
              <th>{{ $i18n('TextRate')}}</th>
              <th>{{ $i18n('TextDate')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cur in currenciesStore.getCurrenciesNoRub()" :key="cur" class="table-row">
              <td>{{ cur }}</td>
              <td>{{ currencyFilter(currenciesStore.getCurrency(cur),"RUB") }}</td>
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
