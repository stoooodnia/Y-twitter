<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="group flex flex-col gap-4 py-2 ">
    <div class="flex flex-1 flex-col">
      <div class="flex items-start p-4">
        <div class="flex items-start gap-4 text-sm">
          <span
            class="relative flex shrink-0 overflow-hidden rounded-full w-14 h-14 border-2 border-white"
          >
          <img :src="user.profilePicture" alt="Profile Picture" >
    
          </span>
          <div class="grid gap-1">
            <div class="font-semibold">{{ post.authorName }}</div>
            <a :href="`/profile/${post.authorId}`" class="line-clamp-1 text-xs text-gray-500 hover:underline">@{{ post.authorId }}</a>
          </div>
        </div>
        <div class="ml-auto text-xs text-gray-500">{{ post.createdAt }}</div>
      </div>
      <div
        class="flex-1 whitespace-pre-wrap px-4 pt-4 text-sm"
      >
        <p v-if="!post.isQuote">{{ post.content }}</p>
        <p v-else-if="post.content && post.isQuote">{{ post.content }}</p>
        <div v-else class="flex text-gray-400">         
        <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="h-5 w-5 "
    >
      <path d="m17 2 4 4-4 4"></path>
      <path d="M3 11v-1a4 4 0 0 1 4-4h14"></path>
      <path d="m7 22-4-4 4-4"></path>
      <path d="M21 13v1a4 4 0 0 1-4 4H3"></path>
        </svg>
        {{ post.authorName }} shared:</div>
      </div >
      <!-- isQuote -->
      <div v-show="post.isQuote" class="border p-1 rounded-lg m-4"> 
        <div class="flex items-start p-4">

          <div class="flex items-start gap-4 text-sm">
            <span
              class="relative flex shrink-0 overflow-hidden rounded-full w-14 h-14 border-2 border-white"
            >
            <img :src="quoteUser.profilePicture" alt="Profile Picture" >
      
            </span>
            <div class="grid gap-1">
              <div class="font-semibold">{{ quotedPost.authorName }}</div>
              <a :href="`/profile/${quotedPost.authorId}`" class="line-clamp-1 text-xs text-gray-500 hover:underline">@{{ quotedPost.authorId }}</a>
            </div>
          </div>
          <div class="ml-auto text-xs text-gray-500">{{ quotedPost.createdAt }}</div>
        </div>
        <div
          class="flex-1 whitespace-pre-wrap p-4 text-sm prose prose-sm prose-p:leading-normal"
        >
          <p>{{ quotedPost.content }}</p>
        </div>

      </div>
    </div>
    <!-- buttons -->
    <div class="pl-4">
      <button @click="toggleReplies" class="h-10 w-10 hover:text-blue-500 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-5 w-5"
        >
          <path d="M17 6.1H3"></path>
          <path d="M21 12.1H3"></path>
          <path d="M15.1 18H3"></path>
        </svg>
      </button>
      <button @click="toggleShare" class="h-10 w-10 hover:text-green-500 transition-colors">    
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="h-5 w-5"
    >
      <path d="m17 2 4 4-4 4"></path>
      <path d="M3 11v-1a4 4 0 0 1 4-4h14"></path>
      <path d="m7 22-4-4 4-4"></path>
      <path d="M21 13v1a4 4 0 0 1-4 4H3"></path>
    </svg>
  </button>
  <button class="h-10 w-10 hover:text-pink-600 transition-colors">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="h-5 w-5"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
    </svg>
  </button>
    </div>
    <!--  -->
    <div v-show="showShare" @mouseleave="toggleShare" class="pl-12">
      <button @click="share" class="p-1 text-white ml-2 mb-2 hover:text-green-500 transition-colors flex gap-2 items-center">
        <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="h-5 w-5 "
    >
      <path d="m17 2 4 4-4 4"></path>
      <path d="M3 11v-1a4 4 0 0 1 4-4h14"></path>
      <path d="m7 22-4-4 4-4"></path>
      <path d="M21 13v1a4 4 0 0 1-4 4H3"></path>
        </svg>
        Share content
      </button>
      <button @click="toggleQuote" class=" p-1 text-white ml-2 mb-2 hover:text-green-500 transition-colors flex gap-2 items-center">
        <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="h-5 w-5 "
    >
      <path d="m17 2 4 4-4 4"></path>
      <path d="M3 11v-1a4 4 0 0 1 4-4h14"></path>
      <path d="m7 22-4-4 4-4"></path>
      <path d="M21 13v1a4 4 0 0 1-4 4H3"></path>
        </svg>
        Quote
      </button>
    </div>
    <div v-show="showQuote" class="px-4 py-2 border border-gray-300 rounded-md">
          <button @click="toggleQuote" class="text-gray-500 hover:text-gray-700 ml-2 mb-2">
            <svg class="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6m0 12L6 6"/>
            </svg>
          </button>
          <textarea v-model="newQuote" rows="3" maxlength="1000" class="w-full border border-gray-300 rounded-md mb-2 p-2" placeholder="Add reply..."></textarea>
          <button @click="quote" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Quote</button>
        </div>
<!--  -->
    <div v-if="showReplies" class="px-4 py-2 border border-gray-300 rounded-md">
      <button @click="toggleReplies" class="text-gray-500 hover:text-gray-700 ml-2 mb-2">
        <svg class="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6m0 12L6 6"/>
        </svg>
      </button>
      <textarea v-model="newReply" rows="3" maxlength="100" class="w-full border border-gray-300 rounded-md mb-2 p-2" placeholder="Add reply..."></textarea>
      <button @click="addReply" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Add reply</button>
      <div class="mt-4">
        <Post v-for="reply in replies" :key="reply.id" :post="reply" class="group flex flex-col gap-4 py-2 px-4 border-b border-gray-600"/>
      </div>
    </div>
  </div>
</template>

<script>
import dataService from '@/services/dataService';
import { useAuthStore } from '@/stores/authStore';
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: {},
      showReplies: false,
      showShare: false,
      showQuote: false,
      newReply: '',
      replies: [],
      quotedPost: {},
      newQuote: '',
      quoteUser: {},
    };
  },
  mounted() {
    this.user = dataService.getUserById(this.post.authorId).then((res) => {
      this.user = res.data.user;
    });
    if(this.post.isQuote) {
      dataService.getPostById(this.post.quotedPostId).then((res) => {
        this.quotedPost = res.data.post;
        
      }).then(() => {
        dataService.getUserById(this.quotedPost.authorId).then((res) => {
          this.quoteUser = res.data.user;
        })
      })
    }
  },
  methods: {
    toggleReplies() {
      this.fetchReplies()
      this.showShare = false;
      this.showReplies = !this.showReplies;
    },
    toggleShare() {
      this.showReplies = false;
      this.showShare = !this.showShare;
    
    },
    addReply() {
      const data = {
        userId: useAuthStore().user.userId,
        postId: this.post.postId,
        content: this.newReply,
      }

      dataService.addReply(data).then(() => {
        this.newReply = '';
        this.fetchReplies();
      });  
    },
    fetchReplies() {
      dataService.fetchReplies(this.post.postId).then((res) => {
        this.replies = res.data.replies;
      });
    },
    share() {
      const data = {
        userId: useAuthStore().user.userId,
        postId: this.post.postId,
      }
      dataService.share(data).then(() => {
        location.reload();
      })
    },
    quote() {
      const data = {
        userId: useAuthStore().user.userId,
        content: this.newQuote,
        postId: this.post.postId,
      }
      dataService.quote(data).then(() => {
        this.newQuote = '';
        this.toggleQuote();
        location.reload();
      })
    }, 
    toggleQuote() {
      this.showReplies = false;
      this.showShare = false;
      this.showQuote = !this.showQuote;
    }
  },
};
</script>
