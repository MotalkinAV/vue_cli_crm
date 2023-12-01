import { ref } from "vue";

const locale = ref("ru-RU")

function setDateLocale(value) {
  locale.value = value ? value : "ru-RU"
}


function dateFilter(value) {
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };

  const formatedDate = new Intl.DateTimeFormat(locale.value, dateOptions).format(
    value
  );

  return `${formatedDate}`;
}

function dateFilterShort(value) {
  const dateOptions = {
    year: "numeric",
    month: "numeric",
    day: "2-digit",
  };

  const formatedDate = new Intl.DateTimeFormat(locale.value, dateOptions).format(
    value
  );

  return `${formatedDate}`;
}

function timeFilter(value) {
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const formatedTime = new Intl.DateTimeFormat(locale.value, timeOptions).format(
    value
  );

  return `${formatedTime}`;
}

export { dateFilter, dateFilterShort, timeFilter, setDateLocale };
