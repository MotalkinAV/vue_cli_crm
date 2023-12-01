import { ref } from "vue";
import ru from "../locales/ru.json";
import en from "../locales/en.json";
import de from "../locales/de.json"

export const languages = ref([
  { title: "English", locale: "en-US" },
  { title: "Русский", locale: "ru-RU" },
  { title: "Deutsch", locale: "de-DE"}
]);

const locale = ref("ru-RU");

const locales = {
  "ru-RU": ru,
  "en-US": en,
  "de-DE": de,
};

export function seti18nLocale(value) {
  locale.value = value ? value : "ru-RU";
}

export function i18n(key) {
  return locales[locale.value][key] || key
}

export const i18nPlugin = {
  install(app) {
    app.config.globalProperties.$i18n = i18n;
  },
};