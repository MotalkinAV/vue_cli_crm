<template>
  <div>
    <div class="page-title">
      <h3>{{ $i18n('TitleRecord')}}</h3>
    </div>

    <the-loader v-if="isLoadingRecords" />

    <div v-else-if="!categories.length">
      <h5 class="center">
        {{ $i18n('TextNoCategories')}}
        <router-link to="/categories">{{ $i18n('LinkAddNewCategory')}}</router-link>
      </h5>
    </div>

    <form v-else class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" v-model="currentCategory">
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.title }}
          </option>
        </select>
        <label>{{ $i18n('FormSelectCategory')}}</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="state.type"
          />
          <span>{{ $i18n('TextIncome')}}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="state.type"
          />
          <span>{{ $i18n('TextOutcome')}}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="state.amount"
          :class="{ invalid: validator.amount.$errors.length }"
        />
        <label for="amount">{{ $i18n('FormAmount')}}</label>
        <span v-if="validator.amount.$errors.length" class="helper-text invalid"
          >{{ $i18n('InvalidAmout')}}</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model.trim="state.description"
          :class="{ invalid: validator.description.$errors.length }"
        />
        <label for="description">{{ $i18n('FormDescription')}}</label>
        <span v-if="validator.description.$errors.length" class="helper-text invalid"
          >{{ $i18n('InvalidDescription')}}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ $i18n('ButtonCreate')}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script setup>
import { useCategoriesStore } from "@/store/categories.store";
import { useInfoStore } from "@/store/info.store";
import { useRecordsStore } from "@/store/records.store";
import { storeToRefs } from "pinia";
import { computed, onMounted, onUpdated, reactive, ref } from "vue";
import M from "../../node_modules/materialize-css/dist/js/materialize.min";
import useVuelidate from "@vuelidate/core";
import { minValue, required } from "@vuelidate/validators";
import router from "@/router/router";
import { loadingRecords, isLoadingRecords } from '../plugins/loader.plugin'
import { AppError } from "@/utils/errors";

const infoStore = useInfoStore()
const recordsStore = useRecordsStore()
const categoriesStore = useCategoriesStore();

const { categories, currentCategory } = storeToRefs(categoriesStore);

const getBill = infoStore.getBill
const changeInfoBill = infoStore.changeInfoBill
const createRecord = recordsStore.createRecord


const select = ref();

const state = reactive({
  categoryId: currentCategory,
  date: new Date(),
  type: "outcome",
  amount: "",
  description: "",
});

const validatorSettings = {
  amount: { required, minValue: minValue(1) },
  description: { required },
};

const validator = useVuelidate(validatorSettings, state);

const canCreateRecord = computed(() => {
  if (state.type === "income") {
    return true
  } else if (getBill() >= state.amount) {
    return true
  }
  return false
})

async function submitHandler() {
  try {
    console.log("RECORD VIEW", "function submitHandler", "START");

    loadingRecords()

    if (validator.value.$invalid) {
      validator.value.$touch();
      router.push('/record?error=incorrect_data')
      loadingRecords()
      return;
    }
    if (canCreateRecord.value) {
      await createRecord(state)
      changeInfoBill(state.type === 'income' ? getBill() + state.amount : getBill() - state.amount)

      state.amount = ""
      state.description = ""

      router.push('/record?success=record_created')
    } else {
      router.push('/record?warning=insufficient_funds')
    }

    loadingRecords()

    console.log("RECORD VIEW", "function submitHandler", 'END')
  } catch (error) {
    loadingRecords()
    console.log("RECORD VIEW", "function submitHandler", error);
    throw new AppError(error);
  }
}

onUpdated(() => {
  console.log("RECORD VUE", "onUpdated", "START");
  M.FormSelect.init(select.value);
  M.updateTextFields();
  console.log("RECORD VUE", "onUpdated", 'END');
});

onMounted(() => {
  console.log("RECORD VUE", "onMounted", "START");
  M.FormSelect.init(select.value);
  M.updateTextFields();
  console.log("RECORD VUE", "onMounted", 'END');
});
</script>
