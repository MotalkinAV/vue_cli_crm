<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ $i18n('TextEdit')}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="currentCategory">
            <option v-for="category in categories" :key="category.id" :value="category.id">{{category.title}}</option>
          </select>
          <label>{{ $i18n('FormSelectCategory')}}</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model.trim="state.title"
            :class="{ invalid: validator.title.$errors.length }"
          />
          <label for="name">{{ $i18n('FormChangeTitle')}}</label>
          <span
            v-if="validator.title.$errors.length"
            class="helper-text invalid"
            >{{ $i18n('InvalidTitle')}}</span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="state.limit"
            :class="{ invalid: validator.limit.$errors.length }"
          />
          <label for="limit">{{ $i18n('FormChangeLimit')}}</label>
          <span
            v-if="validator.limit.$errors.length"
            class="helper-text invalid"
            >{{ $i18n('InvalidMinimalValue')}} {{minLimit}}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ $i18n('ButtonUpdate')}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import router from "@/router/router";
import { useCategoriesStore } from "@/store/categories.store";
import useVuelidate from "@vuelidate/core";
import { minValue, required } from "@vuelidate/validators";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, onMounted, onUpdated, reactive, ref, watch } from "vue";
import M from "../../node_modules/materialize-css/dist/js/materialize.min";
import { loadingCategories } from '../plugins/loader.plugin'
import { AppError } from "@/utils/errors";

const categoriesStore = useCategoriesStore()
const { categories, currentCategory } = storeToRefs(categoriesStore)

const select = ref()
const state = reactive({
  id: "",
  title: "",
  limit: "",
});

watch(currentCategory, (categoryId) => {
const {title, limit} = categories.value.find(category => category.id === categoryId)
 state.title = title
 state.limit = limit
 state.id = categoryId
 console.log('CATEGORY EDIT','watch', currentCategory.value)
})

const validatorSettings = {
  title: { required },
  limit: { required, minValue: minValue(100) },
};

const validator = useVuelidate(validatorSettings, state);

const minLimit = computed(() => {
  return validator.value.limit.minValue.$params.min
})

async function submitHandler() {
  try {
    loadingCategories()
    if (validator.value.$invalid) {
      validator.value.$touch();
      router.push('/categories?error=incorrect_data')
      loadingCategories()
      return;
    }
    console.log('CATEGORY EDIT','function submitHandler', state)
    
    await categoriesStore.updateCategory(state)

    state.title = ''
    state.limit = ''
    validator.value.$reset()
    router.push('/categories?success=category_updated')
    loadingCategories()
  } catch (error) {
    loadingCategories()
    console.log('CATEGORY EDIT','function submitHandler', error)
    throw new AppError(error);
  }
}

onBeforeMount(() => {
 const {title, limit} = categories.value.find(category => category.id === currentCategory.value)
 state.title = title
 state.limit = limit
 state.id = currentCategory.value
})

onMounted(() => {
  M.FormSelect.init(select.value)
  M.updateTextFields()
  console.log("CATEGORIES EDIT", "onMounted", select.value)
  console.log("CATEGORIES EDIT", "onMounted", categories.value[0].id)
})

onUpdated(() => {
    M.FormSelect.init(select.value)
  M.updateTextFields()
})
</script>


