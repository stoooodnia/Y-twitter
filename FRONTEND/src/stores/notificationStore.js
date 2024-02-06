// store.js
import { createPinia, defineStore } from "pinia";

export const pinia = createPinia();

export const useNotificationStore = defineStore({
  id: "notification",
  state: () => {
    return {
      connected: false,
      notifications: [],
      newPostsAvailable: 0,
    };
  },
  actions: {
    addNotification(notification) {
      this.notifications.unshift(notification);
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
    addNewPost() {
      this.newPostsAvailable++;
    },
    clearNewPosts() {
      this.newPostsAvailable = 0;
    },
  },
  persist: true,
});
