// store.js
import { createPinia } from "pinia";

export const pinia = createPinia();

export const useAuthStore = pinia.defineStore("auth", {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    logout() {
      this.user = null;
    },
  },
});
