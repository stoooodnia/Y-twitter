<template>
  <div class="min-h-screen max-w-screen flex bg-black justify-center">
    <NavBarView :route="$route"/> 
      <div class="w-full min-h-screen flex-col items-center border-x border-gray-600  ">
        <div class=" text-white mx-auto flex flex-col gap-4 text-xl py-2 border-b border-gray-600 ">
          <form @submit.prevent="submitPost">
              <div class="flex items-start gap-4 px-4 mt-6">
                <span
              class="relative flex shrink-0 overflow-hidden rounded-full w-24 h-24 border-2 border-white"
            >
            <img :src="user.profilePicture" alt="Profile Picture" >
      
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
              class="w-24 my-2 px-4 py-2  bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Post
            </button>
          </div>
          </form>
        </div>
        <!-- <div v-show="state.postEvents.length > 0" class="text-red-500"> New Post! refresh site!</div> -->
        <div class="w-full mt-4 text-white">
          <Post v-for="post in posts" :key="post.id" :post="post" class="px-4 border-b border-gray-600" />
          <div> new posts available</div>
        </div> 
      </div>
    <RightBarView />
  </div>
</template>
  
<script>
  import Post from "@/components/Post.vue";
  import NavBarView from "@/views/NavBarView.vue";
  import RightBarView from "@/views/RightBarView.vue";
  import dataService from "@/services/dataService";
  import { useAuthStore } from "@/stores/authStore";
  import { socket } from '@/socket/socket.js';
  
  export default {
    components: {
      NavBarView,
      RightBarView,
      Post
    },
    data() {
      return {
        user: useAuthStore().user,
        newPostContent: "",
        posts: this.fetchPosts(useAuthStore().user.userId),
      };
    },  
    methods: {
      submitPost() {
        const newPost = {
            userId: useAuthStore().user.userId,
            content: this.newPostContent,
        };
        dataService.addPost(newPost).then(() => {
            this.fetchPosts(useAuthStore().user.userId);
            this.newPostContent = "";
        }).then(() => {
          socket.emit("post", newPost)
        })
      },
      fetchPosts(userId) {
        dataService.fetchPosts(userId).then((res) => {
            // console.log(res.data.posts);
            this.posts = res.data.posts;
        });
      }
    }
  };
  </script>
  