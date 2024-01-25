<template>
    <div class="w-full min-h-screen flex-col items-center border-x border-gray-600  ">
      <div class=" text-white mx-auto flex flex-col gap-4 text-xl py-2 border border-gray-600 ">
        <form @submit.prevent="submitPost">
            <div class="flex items-start gap-4 px-4 mt-6">
                <span
            class="relative flex h-20 w-20 shrink-0 overflow-hidden border border-white rounded-full"
          >
            <span
              class="flex h-full w-full items-center justify-center rounded-full bg-muted"
            >Y</span
            >
          </span>
                <textarea
                v-model="newPostContent"
                class="h-auto w-full p-2 border border-gray-400 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="What's happening?"
                rows="3"
                >
                </textarea>
            </div>
        <div class="flex justify-end px-4 mt-2">
            <button
            type="submit"
            class="w-24 mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Post
          </button>
        </div>
          
        </form>
      </div>
  
      <!-- Lista tweetów -->
      <div class="w-full mt-4">
        <Post v-for="post in posts" :key="post.id" :post="post" />
      </div>
    </div>
  </template>
  
  <script>
  import Post from "@/components/Post.vue";
import dataService from "@/services/dataService";
import { useAuthStore } from "@/stores/authStore";
  
  export default {
    components: {
      Post
    },
    data() {
      return {
        newPostContent: "",
        posts: [] 
      };
    },
    methods: {
      submitPost() {
        const newPost = {
            userId: useAuthStore().user.userId,
            content: this.newPostContent,
        };
        dataService.addPost(newPost).then(() => {
            this.posts.unshift(newPost);
            this.newPostContent = "";
        });
      }
    }
  };
  </script>
  