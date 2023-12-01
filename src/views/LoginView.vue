<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">

      <span class="card-title">{{ $i18n('TitleApp')}}</span>

      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="state.email"
          :class="{ invalid: validator.email.$errors.length }"
        />
        <label for="email">{{ $i18n('FormEmail')}}</label>
        <small
          class="helper-text invalid"
          v-for="error of validator.email.$errors"
          :key="error.$uid"
          >{{ $i18n(error.$message) }}</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          :type="hidePasswordType"
          class="password"
          v-model.trim="state.password"
          :class="{ invalid: validator.password.$errors.length }"
        />
        <a v-if="isHidePassword" @click="hidePasswordPlugin()" class="material-icons password-control">visibility</a>
        <a v-else @click="hidePasswordPlugin()" class="material-icons password-control">visibility_off</a>
        <label for="password">{{ $i18n('FormPassword')}}</label>
        <small
          class="helper-text invalid"
          v-for="error of validator.password.$errors"
          :key="error.$uid"
          >{{ $i18n(error.$message) }}</small
        >
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{ $i18n('ButtonSingIn')}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ $i18n('TextNoAccount')}}
        <router-link to="/register">{{ $i18n('LinkSingUp')}}</router-link>
      </p>
    </div>
  </form>
</template>

<script setup>
import router from "@/router/router";
import { useVuelidate } from "@vuelidate/core";
import { email, minLength, required } from "@vuelidate/validators";
import { reactive } from "vue";
import { useAuthStore } from "../store/auth.store";
import { hidePasswordPlugin, isHidePassword, hidePasswordType } from '../plugins/hide.password.plugin'
import { loading } from '../plugins/loader.plugin'
import { AppError } from "@/utils/errors";

const authStore = useAuthStore();

const state = reactive({
  email: "",
  password: "",
});

const validatorSettings = {
  email: { required, email },
  password: { required, minLength: minLength(6) },
};

const validator = useVuelidate(validatorSettings, state);

async function submitHandler() {
  try {
    loading();
    
    console.log("LOGIN VIEW", "function submitHandler")
    if (validator.value.$invalid) {
      validator.value.$touch();
      router.push('/login?error=incorrect_data')
      loading();
      return;
    }
    await authStore.login(state);
    router.push("/?success=authorized");

    loading();
  } catch (error) {
    loading();
    throw new AppError(error);
  }
}
</script>