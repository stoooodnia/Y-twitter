<template>
      <main class="max-w-2xl px-4  text-white">
        <div class="mt-4">
          <div class="flex items-center" @mouseover="showResults">
            <!-- Pole wprowadzania tekstu -->
            <input
            @input="showResults"
              v-model="searchQuery"
              type="text"
              placeholder="Search profiles..."
              class="flex-1 px-4 py-2 border rounded focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-6 h-6 ml-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 10-14 0 7 7 0 0014 0z"
                />
              </svg>
          </div>
          <div @mouseover="showResults" @mouseleave="hideResults">
            <ul v-show="resultDisplay" v-if="searchResults.length > 0" class="pt-4">
              <li v-for="profile in searchResults" :key="profile.userId" class="mb-2 pt-0">
                <router-link :to="{ name: 'profile', params: { userId: profile.userId } }" class="flex gap-4 items-center bg-black hover:bg-gray-700 rounded-md px-2 py-2">
                  <img
                    :src="profile.profilePicture"
                    :alt="profile.username"
                    class="w-10 h-10 rounded-full"
                  />
                  <h3 class="text-sm font-bold bg-transparent">{{ profile.username }}</h3>
                  <FollowButton :profile="profile" />
                </router-link>
              </li>
            </ul>

          <p v-else class="mt-8 text-gray-400" v-show="resultDisplay">No results found.</p>
        </div>
        </div>
      </main>
  </template>
  
  <script>
  import dataService from "@/services/dataService.js";
  import FollowButton from "./FollowButton.vue";
  import { useAuthStore } from "@/stores/authStore.js";
  export default {
    data() {
        return {
            resultDisplay: false,
            searchQuery: "",
            searchResults: [],
        };
    },
    watch: {
        searchQuery: {
            handler: "searchProfiles",
            immediate: true,
        }
    },
    methods: {
        searchProfiles() {
            dataService.searchProfiles(this.searchQuery)
                .then((response) => {
                this.searchResults = response.data.profiles.filter((profile) => {
                    return profile.userId !== useAuthStore().user.userId;
                })
            });
        },
        showResults() {
            this.resultDisplay = true;
        },
        hideResults() {
            this.resultDisplay = false;
        },
    },
    components: { FollowButton }
};
  </script>
  