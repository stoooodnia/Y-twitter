// store.js
import { createPinia, defineStore } from "pinia";
import dataService from "@/services/dataService";

export const pinia = createPinia();

export const usePostsStore = defineStore({
  id: "posts",
  state: () => {
    return {
      posts: [],
      from: 0,
      to: 5,
    };
  },
  actions: {
    fetchPosts(userId) {
      if (this.posts.length > 0) return;
      dataService.fetchPosts(userId, this.from, this.to).then((response) => {
        this.posts = response.data.posts;
      });
    },
    fetchNextPosts(userId) {
      this.from += 5;
      this.to += 5;
      dataService.fetchPosts(userId, this.from, this.to).then((response) => {
        this.posts.push(...response.data.posts);
      });
    },
    fetchPreviousPosts(userId) {
      if (this.from === 0) return;
      this.from -= 5;
      this.to -= 5;
      dataService.fetchPosts(userId, this.from, this.to).then((response) => {
        this.posts.unshift(...response.data.posts);
      });
    },
  },
  persist: true,
});
