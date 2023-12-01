import axios from "../axios/request";
import { getUrl} from '../axios/config.requests'
import { defineStore } from "pinia";
import { ref } from "vue";
import { AppError } from "@/utils/errors";

export const useCategoriesStore = defineStore("categories", () => {

  const categories = ref([])
  const currentCategory = ref(null)



  function setCategories(value) {
    categories.value = Object.keys(value).map(key => ({...value[key], id: key}))
  }
  function setCurrentСategory(value) {
    currentCategory.value = value
  }
  function updateCategories(category, id) {
    console.log("CATEGORIES STORE", "function updateCategories", "START");
    const idx = categories.value.findIndex(c => c.id === id)
    categories.value[idx].title = category.title
    categories.value[idx].limit = category.limit
  }
  function addCategoryInCategories(value) {
    categories.value.push(value)
  }


  async function downloadCategories() {
    try {
      console.log("CATEGORIES STORE", "function downloadCategories", 'START')
      const { data } = await axios.get(getUrl("/categories"));
      setCategories(data)
      setCurrentСategory(categories.value[0].id)
    } catch (error) {
      throw new AppError(error);
    }
  }

  async function downloadCategoryById(id) {
    try {
      console.log("CATEGORIES STORE", "function downloadCategoryById", 'START')
      const { data } = await axios.get(getUrl("/categories/" + id));
      return {...data, id}
    } catch (error) {
      throw new AppError(error);
    }
  }

  async function updateCategory(payload) {
    try {
      console.log("CATEGORIES STORE", "function updateCategory", 'START')
      console.log("CATEGORIES STORE", "function updateCategory", payload.id)
      const { data } = await axios.put(getUrl(`/categories/${payload.id}`), {title: payload.title, limit: payload.limit});
      console.log("CATEGORIES STORE", "function updateCategory", data)
      updateCategories(data, payload.id)
    } catch (error) {
      throw new AppError(error);
    }
  }

  async function createCategory(payload) {
    try {
      const { data } = await axios.post(getUrl("/categories"), {title: payload.title, limit: payload.limit});
      const category = {...payload, id: data.name}
      addCategoryInCategories(category)
      setCurrentСategory(category.id)
    } catch (error) {
      throw new AppError(error);
    }
  }

  return {
    downloadCategories,
    downloadCategoryById,
    createCategory,
    updateCategory,
    setCurrentСategory,
    currentCategory,
    categories,
  };
});
