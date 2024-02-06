<template>
  <NewPostsAlert @clicked="fetchPreviousPosts"/>
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
          <!-- <button @click="fetchPreviousPosts">previous posts</button> -->
          <Post v-for="post in posts" :key="post.id" :post="post" class="px-4 border-b border-gray-600" />
          <div ref="scrollObserver"></div>
        </div>
        <div class="text-lg text-gray-500 w-full flex justify-center"> no more posts</div>
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
  import NewPostsAlert from "@/components/NewPostsAlert.vue";
  
  export default {
    components: {
    NavBarView,
    RightBarView,
    Post,
    NewPostsAlert
},
    data() {
      return {
        user: useAuthStore().user,
        newPostContent: "",
        posts: [],
      };
    },
    // dev testing only
    watch: {
      posts() {
        console.log("posts download: ", this.posts.length);
      }
    },
    created() {
      this.fetchPosts();
    },
    mounted() {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (this.posts.length > 0) {
            this.fetchNextPosts();
          }
          
          // alert("fetching next posts");
        }
      }, { threshold: 0.5 });
      observer.observe(this.$refs.scrollObserver);
    },
    methods: {
      submitPost() {
        const newPost = {
            userId: this.user.userId,
            content: this.newPostContent,
        };
        dataService.addPost(newPost).then(() => {
            this.fetchPosts();
            this.newPostContent = "";
        }).then(() => {
          socket.emit("post", newPost)
        })
      },
      fetchPosts() {
        const createdAt = "";
        const direction = "";
        dataService.fetchPosts(this.user.userId, createdAt, direction).then((response) => {
          this.posts = response.data.posts
        });
      },
      fetchNextPosts() {
        const createdAt = this.posts ? this.posts[this.posts.length - 1].createdAt : "";
        const direction = "next";
        dataService.fetchPosts(this.user.userId, createdAt, direction).then((response) => {
          this.posts = this.posts.concat(response.data.posts);
        });
      },
      fetchPreviousPosts() {
        // alert("fetching previous posts")
        const createdAt = this.posts ? this.posts[0].createdAt : "";
        const direction = "previous";
        dataService.fetchPosts(this.user.userId, createdAt, direction).then((response) => {
          console.log("response: ", response.data.posts)
          this.posts = response.data.posts.concat(this.posts);
        });
      }

    }
  };
  </script>
  