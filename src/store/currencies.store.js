import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

const CBR_URL = 'https://www.cbr-xml-daily.ru/latest.js'

export const useCurrenciesStore = defineStore("currencies", () => {
  const currency = ref({});
  const currencies = ref(["RUB", "USD", "EUR"]);

  function getCurrencies() {
    return currencies.value;
  }

  function getCurrenciesNoRub() {
    return currencies.value.filter((c) => c !== "RUB")
  }

  function getCurrency(value) {
    return 1 / currency.value.rates[value] ;
  }

  function getCurrencyDate() {
    return currency.value.date;
  }

  function setCurrency(value) {
    value.rates.RUB = 1
    currency.value = value;
  }

  function getMulticurrencyBill(bill, cur) {
    return Math.floor(bill * currency.value.rates[cur]);
  }

  async function fetchCurrency() {
    try {
      console.log("CURRENCIES STORE", "function fetchCurrency");
      const { data } = await axios.get(CBR_URL)

      setCurrency(data);
      console.log("CURRENCIES STORE", currency.value);
    } catch (error) {
      console.log("CURRENCIES STORE", "function fetchCurrency", error);
    }
  }

  return {
    currency,
    currencies,
    getCurrencies,
    getCurrenciesNoRub,
    getCurrency,
    getCurrencyDate,
    fetchCurrency,
    getMulticurrencyBill,
  };
});
