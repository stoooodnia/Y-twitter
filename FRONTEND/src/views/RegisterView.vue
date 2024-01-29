<template>
    <div class="bg-zinc-900 h-screen w-full flex items-center justify-center">
      <div class="bg-black p-8 rounded-lg shadow-md w-96">
        <h1 class="text-white text-2xl font-bold mb-6">Create an Account</h1>
  
        <div class="mb-4">
          <label for="username" class="block text-gray-300 text-sm font-bold mb-2">Username</label>
          <input v-model="username" type="text" id="username" name="username" class="w-full px-3 py-2 border border-gray-600 rounded focus:outline-none focus:border-blue-500 bg-gray-700 text-white">
        </div>
  
        <div class="mb-4">
          <label for="email" class="block text-gray-300 text-sm font-bold mb-2">Email Address</label>
          <input v-model="email" type="email" id="email" name="email" class="w-full px-3 py-2 border border-gray-600 rounded focus:outline-none focus:border-blue-500 bg-gray-700 text-white">
        </div>
  
        <div class="mb-6">
          <label for="password" class="block text-gray-300 text-sm font-bold mb-2">Password</label>
          <input v-model="password" type="password" id="password" name="password" class="w-full px-3 py-2 border border-gray-600 rounded focus:outline-none focus:border-blue-500 bg-gray-700 text-white">
        </div>
  
        <button @click="register" class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue" type="button">
          Register
        </button>
  
        <div class="mt-4">
          <p class="text-gray-400 text-sm">Already have an account? <a href="/login" class="text-blue-500 hover:underline">Log in here</a></p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import authClient from "@/services/authService.js";
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
      };
    },
    methods: {
      register() {
        console.log('Registering...');
        const data = {
            username: this.username,
            email: this.email,
            password: this.password,
          };
          authClient.register(data).then((response) => {
            if(response.status === 201) {

              this.$router.push({ name: "login" });
            }
            this.$router.push({ name: "home" });
          });
      },
    },
  };
  </script>
