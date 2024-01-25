<template>
    <button
    class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium border text-gray-200 border-white bg-black hover:bg-red-600 hover:text-white h-9 rounded-md px-3"
      @click="logout"
    >
      Logout
    </button>
  </template>
  
  <script>
  import { useAuthStore } from "@/stores/authStore.js";
  import authService from "@/services/authService";
  
  export default {
    methods: {
      logout() {
        authService.logout().then(() => {
          useAuthStore().logout();
          this.$router.push({name: "home"});
        });
      }
    }
  };
  </script>
  