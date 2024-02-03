// store.js
import { createPinia, defineStore } from "pinia";
import dataService from "@/services/dataService";

export const pinia = createPinia();

export const usePostsStore = defineStore({
  id: "posts",
  state: () => {
    return {
      posts: [],
    };
  },
  actions: {
    fetchPosts(userId) {
      if (this.posts.length !== 0) {
        return;
      }
      const from = 0;
      const to = 5;
      dataService.fetchPosts(userId, from, to).then((response) => {
        this.posts = response.data.posts;
      });
    },
    fetchNextPosts(userId) {
      const from = this.posts.length;
      const to = this.posts.length + 5;
      console.log(userId, from, to);
      dataService.fetchPosts(userId, from, to).then((response) => {
        console.log(this.posts);
        this.posts.push(...response.data.posts);
      });
    },
    fetchPreviousPosts(userId) {
      const from = this.posts.length - 5;
      const to = this.posts.length;
      dataService.fetchPosts(userId, from, to).then((response) => {
        this.posts.unshift(...response.data.posts);
      });
    },
  },
  persist: true,
});
