<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ $i18n('TextCreate')}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model.trim="state.title"
            :class="{ invalid: validator.title.$errors.length }"
          />
          <label for="name">{{ $i18n('FormTitle')}}</label>
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
          <label for="limit">{{ $i18n('FormLimit')}}</label>
          <span v-if="validator.limit.$errors.length" class="helper-text invalid">{{ $i18n('InvalidMinimalValue')}} {{minLimit}}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ $i18n('ButtonCreate')}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { minValue, required } from "@vuelidate/validators";
import { computed, onMounted, reactive } from "vue";
import {useCategoriesStore} from '../store/categories.store'
import M from "../../node_modules/materialize-css/dist/js/materialize.min";
import { loadingCategories } from '../plugins/loader.plugin'
import router from "@/router/router";
import { AppError } from "@/utils/errors";

const categoriesStore = useCategoriesStore()

const state = reactive({
  title: "",
  limit: "",
});

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
    console.log('CATEGORY CREATE','function submitHandler')
    await categoriesStore.createCategory(state);
    state.title = ''
    state.limit = ''
    validator.value.$reset()
    router.push('/categories?success=category_created')
    loadingCategories()
  } catch (error) {
    loadingCategories()
    console.log('CATEGORY CREATE','function submitHandler', error)
    throw new AppError(error);
  }
}

onMounted(() => {
  M.updateTextFields()
})
</script>
