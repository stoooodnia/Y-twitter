<template>
      <main class="max-w-2xl px-4 sm:px-6 lg:px-8 text-white">
        <div class="mt-8">
          <div class="flex items-center mb-4" @mouseover="showResults">
            <!-- Pole wprowadzania tekstu -->
            <input
            @input="showResults"
              v-model="searchQuery"
              type="text"
              placeholder="Search profiles..."
              class="flex-1 px-4 py-2 border rounded-l focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
            />
            <button
              @click="searchProfiles"
              class="border-r border-t border-b text-white py-2 px-4 rounded-r hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 10-14 0 7 7 0 0014 0z"
                />
              </svg>
            </button>
          </div>
          <div @mouseover="showResults" @mouseleave="hideResults">
            <ul v-show="resultDisplay" v-if="searchResults.length > 0" class="mt-8">
              <li v-for="profile in searchResults" :key="profile.userId" class="mb-4">
                <h3 class="text-sm font-bold">{{ profile.username }}</h3>
                <p class="text-gray-400">{{ profile.description }}</p>
              </li>
            </ul>

          <p v-else class="mt-8 text-gray-400" v-show="resultDisplay">No results found.</p>
        </div>
        </div>
      </main>
  </template>
  
  <script>
  import dataService from "@/services/dataService.js";
  export default {
    data() {
      return {
        resultDisplay: false,
        searchQuery: "",
        searchResults: [],
        // searchResults: [{ userId: 1, username: "Test", description: "Test" }, { userId: 2, username: "Test2", description: "Test2" }],
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
          this.searchResults = response.data.profiles;
        });
      },
      showResults() {
      this.resultDisplay = true;
        },
      hideResults() {
       this.resultDisplay = false;
      },
    },
  };
  </script>
  