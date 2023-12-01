import { defineStore } from "pinia";
import axios from "../axios/request";
import { getUrl} from '../axios/config.requests'
import { ref } from "vue";
import { AppError } from "@/utils/errors";

export const useRecordsStore = defineStore("record", () => {

  const records = ref([])

  function getRecords() { return records }
  function addRecordInRecords(value) { records.value.push(value) }
  function setRecords(value) {
    records.value = Object.keys(value).map(key => ({...value[key], id: key}))
  }


  async function downloadRecords() {
    try {
      console.log("RECORD STORE", "function downloadRecords", 'START')
      const { data } = await axios.get(getUrl("/records"));
      setRecords(data)
    } catch (error) {
      console.log("RECORD STORE", "function downloadRecords", error);
      throw new AppError(error);
    }
  }

  async function downloadRecordById(id) {
    try {
      console.log("RECORD STORE", "function downloadRecordById", 'START')
      const { data } = await axios.get(getUrl("/records/" + id));
      return {...data, id}
    } catch (error) {
      console.log("RECORD STORE", "function downloadRecordById", error);
      throw new AppError(error);
    }
  }

  async function createRecord(payload) {
    try {
      console.log("RECORD STORE", "function createRecord", 'START!!!');
      const { data } = await axios.post(getUrl("/records"), payload);
      console.log("RECORD STORE", "function createRecord", {...payload})
      const record = {...payload, id: data.name}
      addRecordInRecords(record)
    } catch (error) {
      console.log("RECORD STORE", "function createRecord", error);
      throw new AppError(error);
    }
  }

  return {
    downloadRecords,
    downloadRecordById,
    createRecord,
    getRecords,
    records,
  };
});
