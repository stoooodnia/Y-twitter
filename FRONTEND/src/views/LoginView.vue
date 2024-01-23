<template>
    <div class="bg-zinc-950 h-screen flex items-center justify-center">
      <div class="bg-black p-8 rounded-lg shadow-md w-96">
        <h1 class="text-white text-2xl font-bold mb-6">Login to Twitter</h1>
        <div class="mb-4">
          <label for="username" class="block text-gray-300 text-sm font-bold mb-2"
            >Username</label
          >
          <input
            v-model="username"
            type="text"
            id="username"
            name="username"
            class="w-full px-3 py-2 border border-gray-600 rounded focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
          />
        </div>
  
        <div class="mb-6">
          <label for="password" class="block text-gray-300 text-sm font-bold mb-2"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            name="password"
            class="w-full px-3 py-2 border border-gray-600 rounded focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
          />
        </div>
  
        <button
          @click="login"
          class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
          type="button"
        >
          Log in
        </button>
  
        <div class="mt-4">
          <a href="#" class="text-blue-500 hover:underline">Forgot password?</a>
        </div>
  
        <div class="mt-6">
          <p class="text-gray-400 text-sm">
            Don't have an account?
            <a href="/register" class="text-blue-500 hover:underline">Sign up here</a>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    import authClient from "@/services/authService.js";
    import { useAuthStore } from "@/stores/authStore.js";
    export default {
      data() {
        return {
          username: "",
          password: "",
        };
      },
      methods: {
        login() {
          const data = {
            username: this.username,
            password: this.password,
          };
          console.log(data);
          console.log("Logging in...");
          authClient.login(data).then((response) => {
            const user = response.data
            const store = useAuthStore();
            store.setUser(user);
            this.$router.push({ path: "/profile" });
          });
        },
      },
    };
  </script>
  
  