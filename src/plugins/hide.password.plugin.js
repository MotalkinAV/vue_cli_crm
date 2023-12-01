import { ref } from "vue"

export const isHidePassword = ref(true)
export const hidePasswordType = ref('password')

export function hidePasswordPlugin() {
  isHidePassword.value = !isHidePassword.value
  isHidePassword.value ? hidePasswordType.value = 'password' : hidePasswordType.value = 'text'
}