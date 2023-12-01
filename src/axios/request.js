import axios from "axios";

const requestAxios = axios.create(
  {
  baseURL: `${process.env.VUE_APP_FIREBASE_URL}`,
});
export default requestAxios;
