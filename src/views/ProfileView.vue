<template>
  <div>
    <div class="page-title">
      <h3>{{ $i18n('TitleProfile') }}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{ invalid: validator.name.$errors.length }"
        />
        <label for="description">{{ $i18n('FormName')}}</label>
        <span
          v-for="error of validator.name.$errors"
          :key="error.$uid"
          class="helper-text invalid"
          >{{ $i18n(error.$message) }}</span
        >
      </div>

      <div class="input-field">
        <select v-model="locale" ref="selectLang" id="selectLang">
          <option
            v-for="language in languages"
            :key="language"
            :value="language"
          >
            {{ language.title }}
          </option>
        </select>
        <label for="selectLang">{{ $i18n('FormLanguage')}}</label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ $i18n('ButtonUpdate')}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script setup>
import { useInfoStore } from "@/store/info.store";
import { onMounted, ref } from "vue";
import M from "../../node_modules/materialize-css/dist/js/materialize.min";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { AppError } from "@/utils/errors";
import router from "@/router/router";
import { languages } from "../plugins/i18n.plugin"

const infoStore = useInfoStore();

const selectLang = ref();

const name = ref("");
const locale = ref("");

const validatorSettings = {
  name: { required },
};

const validator = useVuelidate(validatorSettings, { name });

async function submitHandler() {
  try {
    if (validator.value.$invalid) {
      validator.value.$touch();
      router.push('/profile?error=incorrect_data')
      return;
    }
    await infoStore.changeInfoName(name.value)
    await infoStore.changeInfoLocale(locale.value)

    router.push('/profile?success=profile_updated')
  } catch (error) {
    throw new AppError(error);
  }
}

function initForm() {
  M.FormSelect.init(selectLang.value)
  M.updateTextFields()
}

onMounted(() => {
  name.value = infoStore.getName();
  locale.value = infoStore.getLocale();

  setTimeout(() => {
    initForm()
  })
});
</script>
