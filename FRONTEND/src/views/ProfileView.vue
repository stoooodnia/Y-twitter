<template>
  <div class="dark w-full min-h-screen bg-gray-900 text-white">
    <header class="relative h-[200px] overflow-hidden">
      <!-- <img
          src="https://www.solidbackgrounds.com/images/3840x2160/3840x2160-dark-gray-solid-color-background.jpg"
          alt="Cover Image"
          width="1200"
          height="400"
          class="absolute inset-0 object-cover w-full h-full"
          style="aspect-ratio: 1200 / 400; object-fit: cover"
        /> -->
    </header>
    <main class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mt-[-72px]">
        <div class="flex justify-between items-end">
          <span
            class="relative flex shrink-0 overflow-hidden rounded-full w-24 h-24 border-4 border-white"
          >
            <span
              class="flex h-full w-full items-center justify-center rounded-full bg-muted"
              >Y</span
            >
          </span>
          <button
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-white border-white relative z-20 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Edit profile
          </button>
        </div>
        <div class="mt-6">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-2xl font-bold">{{ user.username }}</h1>
              <p class="text-sm text-gray-400">@{{ user.userId}}</p>
            </div>
          </div>
          <div class="mt-6">
            <p class="text-sm text-gray-300">Bio: {{ user.description }}</p>
          </div>
        </div>
      </div>
      <div class="mt-12 space-y-8">
        <Post v-for="post in posts" :key="post.createdAt" :post="post"  />
      </div>
    </main>
  </div>
</template>

<script>
import Post from "@/components/Post.vue";
import dataService from "@/services/dataService.js";
import { useAuthStore } from "@/stores/authStore.js";

export default {
  components: {
    Post,
  },
  data() {
    return {
      user: useAuthStore().user,
      posts: []
    };
  },
  created() {
    console.log(this.user.userId)
    this.getPostsOfUser(this.user.userId);
  },
  methods: {
    getPostsOfUser() {
          const userId = useAuthStore().user
          dataService.getPostsByUserId(userId).then((response) => {
            this.posts = response.data;
            console.log(this.posts)
          });
        },
  }
};
</script>
