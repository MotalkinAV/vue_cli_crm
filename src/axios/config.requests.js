const USER_ID = process.env.VUE_APP_USER_ID;
const TOKEN_KEY = process.env.VUE_APP_TOKEN_KEY;

export function getUrl(value) {
  return `/users/${localStorage.getItem(USER_ID)}${value}.json?auth=${localStorage.getItem(TOKEN_KEY)}`
}
