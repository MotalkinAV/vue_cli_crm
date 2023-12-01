import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

const FIXER_URL = `http://data.fixer.io/api/latest?access_key=${process.env.VUE_APP_FIXER_API_KEY}&symbols=USD,EUR,RUB`;

export const useCurrenciesStore = defineStore("currencies", () => {
  const currency = ref({});
  const currencies = ref(["RUB", "USD", "EUR"]);

  function getCurrencies() {
    return currencies.value;
  }

  function getCurrency(value) {
    return currency.value.rates[value];
  }

  function getCurrencyDate() {
    return currency.value.date;
  }

  function setCurrency(value) {
    currency.value = value;
  }

  function getMulticurrencyBill(bill, cur) {
    const baseCurrency =
      bill / (currency.value.rates["RUB"] / currency.value.rates["EUR"]);
    return Math.floor(baseCurrency * currency.value.rates[cur]);
  }

  async function fetchCurrency() {
    try {
      console.log("CURRENCIES STORE", "function fetchCurrency");
      // Вернуть запрос к серверу
      // const { data } = await axios.get(FIXER_URL);

      // Замена запроса к серверу
      console.log("CURRENCIES STORE", "function fetchCurrency", axios);
      console.log("CURRENCIES STORE", "function fetchCurrency", FIXER_URL);
      const data = {
        success: true,
        timestamp: 1519296206,
        base: "EUR",
        date: "2023-11-24",
        rates: {
          EUR: 1,
          RUB: 96.0,
          USD: 1.06,
        },
      };
      // Конец замены запроса к серверу

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
    getCurrency,
    getCurrencyDate,
    fetchCurrency,
    getMulticurrencyBill,
  };
});
