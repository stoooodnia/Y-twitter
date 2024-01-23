// store.js
import { createPinia, defineStore } from "pinia";

export const pinia = createPinia();

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: {},
    };
  },
  actions: {
    setUser(user) {
      this.user = user;
      console.log(this.user);
    },
    logout() {
      this.user = null;
    },
  },
});
