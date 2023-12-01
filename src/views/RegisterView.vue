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
          id="name"
          type="text"
          v-model.trim="state.name"
          :class="{ invalid: validator.name.$errors.length }"
        />
        <label for="name">{{ $i18n('FormName')}}</label>
        <small
          class="helper-text invalid"
          v-for="error of validator.name.$errors"
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
        <a
          v-if="isHidePassword"
          @click="hidePasswordPlugin()"
          class="material-icons password-control"
          >visibility</a
        >
        <a
          v-else
          @click="hidePasswordPlugin()"
          class="material-icons password-control"
          >visibility_off</a
        >
        <label for="password">{{ $i18n('FormPassword')}}</label>
        <small
          class="helper-text invalid"
          v-for="error of validator.password.$errors"
          :key="error.$uid"
          >{{ $i18n(error.$message) }}</small
        >
      </div>

      <div class="input-field">
        <input
          id="confirmPassword"
          :type="hidePasswordType"
          class="password"
          v-model.trim="state.confirmPassword"
          :class="{ invalid: validator.confirmPassword.$errors.length }"
        />
        <label for="confirmPassword">{{ $i18n('FormConfirmPassword')}}</label>
        <small
          class="helper-text invalid"
          v-for="error of validator.confirmPassword.$errors"
          :key="error.$uid"
          >{{ $i18n(error.$message) }}</small
        >       
      </div>

      <div>
        <label>
          <input type="checkbox" v-model="state.agree" />
          <span
            class="helper-text"
            :class="{ invalid: validator.agree.$errors.length }"
            >{{ $i18n('FormAgreeRules')}}</span
          >
        </label>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{ $i18n('ButtonSignUp')}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ $i18n('TextHaveAnAccount')}}
        <router-link to="/login">{{ $i18n('LinkSingIn')}}</router-link>
      </p>
    </div>
  </form>
</template>

<script setup>
import router from "@/router/router";
import { useInfoStore } from "@/store/info.store";
import { useVuelidate } from "@vuelidate/core";
import { email, minLength, required, sameAs } from "@vuelidate/validators";
import { computed, reactive } from "vue";
import { useAuthStore } from "../store/auth.store";
import { hidePasswordPlugin, isHidePassword, hidePasswordType} from "../plugins/hide.password.plugin";
import { loading } from "../plugins/loader.plugin";
import { AppError } from "@/utils/errors";

const authStore = useAuthStore();
const infoStore = useInfoStore();

const state = reactive({
  email: "",
  name: "",
  password: "",
  confirmPassword: "",
  agree: false,
});

const validatorSettings = {
  email: { required, email },
  password: { required, minLength: minLength(6) },
  confirmPassword: { required, sameAsPassword: sameAs(computed(() => { return state.password })) },
  name: { required },
  agree: { checked: (validator) => validator },
};

const validator = useVuelidate(validatorSettings, state);

async function submitHandler() {
  try {
    loading();
    if (validator.value.$invalid) {
      validator.value.$touch();
      router.push('/register?error=incorrect_data')
      loading();
      return;
    }

    await authStore.registration(state);
    await infoStore.createInfo(state);

    router.push("/?success=registreted");
    loading();
  } catch (error) {
    loading();
    throw new AppError(error);
  }
}
</script>
