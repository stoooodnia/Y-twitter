<template>
  <div class="dark w-full min-h-screen bg-black text-white">
    <header class="relative h-[200px] overflow-hidden">
      <img
          :src="user.bgPicture"
          alt="Background Image"
          width="1200"
          height="400"
          class="absolute inset-0 object-cover w-full h-full"
          style="aspect-ratio: 1200 / 400; object-fit: cover"
        />
    </header>
    <main class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mt-[-72px]">
        <div class="flex justify-between items-end">
          <span
            class="relative flex shrink-0 overflow-hidden rounded-full w-24 h-24 border-2 border-white"
          >
          <img :src="user.profilePicture" alt="Profile Picture" >
    
          </span>
          <a v-if="myProfile"
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-white border-white relative z-20 dark:bg-gray-700 dark:hover:bg-gray-600"
            href="/editProfile"
            >
            Edit profile
        </a>
        <FollowButton v-else :profile="user"
        class=" bg-gray-700 hover:bg-gray-600 hover:text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 relative z-20 "
        />
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
        <div class="flex justify-start mb-6">

            <button
              @click="setCurrentView('POSTS')"
              :class="{ 'font-bold': currentView === 'POSTS' }"
              class="text-white focus:outline-none w-32 h-12 hover:bg-zinc-900"
            >
            <span
            :class="{ 'font-bold border-b-2 border-blue-600': currentView === 'POSTS' }"
            class="h-12 w-20"
            >
              POSTS
            </span>
            </button>
            <button
              @click="setCurrentView('REPLIES')"
              :class="{ 'font-bold': currentView === 'REPLIES' }"
              class="text-white focus:outline-none w-32 h-12 hover:bg-zinc-900"
            >
            <span
            :class="{ 'font-bold border-b-2 border-blue-600': currentView === 'REPLIES' }"
            class="h-12 w-20"
            >
              REPLIES
            </span>
        
            </button>
          </div>
          <Post
            v-for="post in filteredPosts"
            :key="post.createdAt"
            :post="post"
            class="border border-gray-800 rounded-lg"
          />
      </div>
    </main>
  </div>
</template>

<script>
import FollowButton from "@/components/FollowButton.vue";
import Post from "@/components/Post.vue";
import dataService from "@/services/dataService.js";
import { useAuthStore } from "@/stores/authStore.js";
import { toRaw } from "vue";
import { socket } from "@/socket/socket.js";

export default {
  components: {
    Post,
    FollowButton
},
  data() {
    return {
      myProfile: false,
      user: {},
      posts: [],
      currentView: 'POSTS', // Początkowy widok
    };
  },
  watch: {
    '$route.params.userId': function(newUserId) {
      this.posts = [];
      this.loadUserData(newUserId);
      console.log(this.user);
    },
    
  },
  created() {
    this.loadUserData(this.$route.params.userId);
    socket.connect();
  },
  computed: {
    filteredPosts() {
      if (this.posts === undefined) return [];
      if (this.currentView === 'POSTS') {
        return this.posts.filter(post => !post.isReply);
      } else if (this.currentView === 'REPLIES') {
        return this.posts.filter(post => post.isReply);
      }
      return this.posts;
    }
  },
  methods: {
    loadUserData(userId) {
      if (userId === useAuthStore().user.userId) {
        this.myProfile = true;
        this.user = toRaw(useAuthStore().user);
      } else {
        this.myProfile = false;
        dataService.getUserById(userId).then((response) => {
          this.user = response.data.user;
        });
      }

      this.getPostsOfUser(userId);
    },
    getPostsOfUser(userId) {
      dataService.getPostsByUserId(userId).then((response) => {
        this.posts = response.data.posts;
      });
    },
    setCurrentView(view) {
      this.currentView = view;
    },
  },
};
</script>
