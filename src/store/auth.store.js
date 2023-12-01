import { defineStore } from "pinia";
import axios from "axios";
import { AppError } from "@/utils/errors";

const USER_ID = process.env.VUE_APP_USER_ID
const TOKEN_KEY = process.env.VUE_APP_TOKEN_KEY
const SING_IN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FIREBASE_API_KEY}`;
const SING_UP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FIREBASE_API_KEY}`;

export const useAuthStore = defineStore("auth", () => {

  function getIsAuth() { 
    const isAuth = localStorage.getItem(TOKEN_KEY)
    
    return !!isAuth; 
  }

  function setUserId(value) {
    localStorage.setItem(USER_ID, value);
  }
  function removeUserId() {
    localStorage.removeItem(USER_ID);
  }
  function setToken(value) {
    localStorage.setItem(TOKEN_KEY, value);
  }
  function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  }

  function logout() {
    console.log('AUTH STORE', 'function logout', "START")
    removeUserId()
    removeToken()
    console.log('AUTH STORE', 'function logout', "END")
  }

  async function login(payload) {
    try {
      console.log('AUTH STORE', 'function login', "START")
      const { data } = await axios.post(SING_IN_URL, {...payload, returnSecureToken: true,});
      setToken(data.idToken);
      setUserId(data.localId);
      console.log('AUTH STORE', 'function login', "END")
    } catch (error) {
      console.log('AUTH STORE', 'function login', error)
      throw new AppError(error);
    }
  }

  async function registration(payload) {
    try {
      console.log('AUTH STORE', 'function registration', "START")
      const { data } = await axios.post(SING_UP_URL, {...payload, returnSecureToken: true,});
       setToken(data.idToken);
       setUserId(data.localId);
      console.log('AUTH STORE', 'function registration', "END")
    } catch (error) {
      console.log('AUTH STORE', 'function registration', error)
      throw new AppError(error);
    }
  }

  return {
    login,
    logout,
    registration,
    getIsAuth,
  };
});
