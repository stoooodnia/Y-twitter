// store.js
import { createPinia, defineStore } from "pinia";

export const pinia = createPinia();

export const useNotificationStore = defineStore({
  id: "notification",
  state: () => {
    return {
      connected: false,
      notifications: [],
    };
  },
  actions: {
    addNotification(notification) {
      this.notifications.push(notification);
    },
    clearNotifications() {
      this.notifications = [];
    },
    clearNotificationByIndex(index) {
      this.notifications.splice(index, 1);
    },
    getNotificationsWithIndex() {
      return this.notifications.map((notification, index) => {
        return { ...notification, index };
      });
    },
    getNotificationsCount() {
      return this.notifications.length;
    },
  },
  persist: true,
});
