import { defineStore } from "pinia";
import { reactive } from "vue";
import axios from "../axios/request";
import { getUrl} from '../axios/config.requests'
import { AppError } from "@/utils/errors";
import { seti18nLocale } from "@/plugins/i18n.plugin";
import { setDateLocale } from "../filters/date.filter"

export const useInfoStore = defineStore("info", () => {

  const info = reactive({});

  function getInfo() {
    return info;
  }
  function setInfo(value) {
    console.log("INFO STORE", "function setLocale",value.locale.locale)
    seti18nLocale(value.locale.locale)
    setDateLocale(value.locale.locale)
    info.value = value;
  }

  function getBill() {
    return info.value.bill;
  }
  function setBill(value) {
    info.value.bill = value;
  }

  function getEmail() {
    return info.value.email;
  }
  function setEmail(value) {
    info.value.email = value;
  }

  function getName() {
    return info.value.name;
  }
  function setName(value) {
    info.value.name = value;
  }

  function getLocale() {
    return info.value.locale;
  }
  function setLocale(value) {
    console.log("INFO STORE", "function setLocale",value.locale)
    seti18nLocale(value.locale)
    setDateLocale(value.locale)
    info.value.locale = value;
  }

  async function createInfo(payload) {
    try {
      console.log("INFO STORE", "function createInfo", "!!START");
      const { data } = await axios.put(getUrl("/info"), { name: payload.name, email: payload.email, bill: 0, locale: {title: "Русский", locale:"ru-RU"} });
      setInfo(data);
      refreshInfo();
      console.log("INFO STORE", "function createInfo", data);
    } catch (error) {
      throw new AppError(error);
    }
  }
  async function refreshInfo() {
    try {
      console.log("INFO STORE", "function refreshInfo", "!!START");
      const { data } = await axios.get(getUrl("/info"));
      setInfo(data);
      console.log("INFO STORE", "function refreshInfo", data);
    } catch (error) {
      console.log("INFO STORE", "function refreshInfo", error)
      throw new AppError(error);
    }
  }
  async function changeInfoName(name) {
    try {
      console.log("INFO STORE", "function changeInfoName", "!!START", );
      const { data } = await axios.put(getUrl("/info/name"), `"${name}"`);
      setName(data);
    } catch (error) {
      throw new AppError(error);
    }
  }
  async function changeInfoEmail(email) {
    try {
      console.log("INFO STORE", "function changeInfoEmail", "!!START");
      const { data } = await axios.put(getUrl("/info/email"), email);
      setEmail(data);
    } catch (error) {
      throw new AppError(error);
    }
  }
  async function changeInfoBill(bill) {
    try {
      console.log("INFO STORE", "function changeInfoBill", "!!START");
      const { data } = await axios.put(getUrl("/info/bill"), bill);
      setBill(data);
    } catch (error) {
      throw new AppError(error);
    }
  }
  async function changeInfoLocale(locale) {
    try {
      console.log("INFO STORE", "function changeInfoLocale", "!!START");
      const { data } = await axios.put(getUrl("/info/locale"), locale);
      setLocale(data);
    } catch (error) {
      throw new AppError(error);
    }
  }

  return {
    info,
    getInfo,
    setInfo,
    getBill,
    getEmail,
    getName,
    getLocale,
    createInfo,
    refreshInfo,
    changeInfoName,
    changeInfoEmail,
    changeInfoBill,
    changeInfoLocale,
  };
});
