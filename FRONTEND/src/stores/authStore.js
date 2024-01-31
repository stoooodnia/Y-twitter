// store.js
import { createPinia, defineStore } from "pinia";

export const pinia = createPinia();

export const useAuthStore = defineStore({
  id: "auth",
  state: () => {
    return {
      user: {},
    };
  },
  actions: {
    setUser(user) {
      this.user = user;
    },
    logout() {
      this.user = {};
    },
  },
  persist: true,
});
