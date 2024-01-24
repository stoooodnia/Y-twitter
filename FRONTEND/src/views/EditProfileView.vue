<template>
    <div class="max-w-2xl mx-auto mt-8 p-8 bg-black rounded-md shadow-md text-white">
      <h1 class="text-2xl font-semibold mb-4">Edit Profile</h1>
  
      <!-- Formularz edycji profilu -->
      <form @submit.prevent="saveChanges">
        <!-- Pole edycji opisu -->
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea v-model="newDescription" id="description" name="description" rows="3" class="mt-1 p-2 w-full border rounded-md"></textarea>
        </div>
  
        <!-- Pole edycji zdjęcia profilowego -->
        <div class="mb-4">
          <label for="profilePicture" class="block text-sm font-medium text-gray-700">Profile Picture (URL)</label>
          <input v-model="newProfilePicture" type="text" id="profilePicture" name="profilePicture" class="mt-1 p-2 w-full border rounded-md" />
        </div>
  
        <!-- Pole edycji zdjęcia w tle -->
        <div class="mb-4">
          <label for="bgPicture" class="block text-sm font-medium text-gray-700">Background Picture (URL)</label>
          <input v-model="newBgPicture" type="text" id="bgPicture" name="bgPicture" class="mt-1 p-2 w-full border rounded-md" />
        </div>
  
        <!-- Przycisk zapisu zmian -->
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save Changes</button>
        <div v-if="error" class="text-red-500 mt-2">
          {{ error }}
        </div>
        <div v-if="success" class="text-green-500 mt-2">
          {{ success }}
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import dataService from "@/services/dataService.js";
  import { useAuthStore } from "@/stores/authStore.js";
  import { toRaw } from "vue";
  export default {
    data() {
      return {
        newDescription: '',
        newProfilePicture: '',
        newBgPicture: '',
        error: '',
        success: '',
      };
    },
    methods: {
      saveChanges() {
        if(!this.newDescription && !this.newProfilePicture && !this.newbgPicture) {
          this.error = 'You must change at least one field.';
            return;
        }
        if(this.newProfilePicture && !this.newProfilePicture.startsWith('http')) {
          this.error = 'Profile Picture must be a valid URL.';
            return;
        }
        if(this.newBgPicture && !this.newBgPicture.startsWith('http')) {
          this.error = 'bg Picture must be a valid URL.';
            return;
        }

        const data = {
            userId: toRaw(useAuthStore().user).userId,
            newDescription: this.newDescription,
            newProfilePicture: this.newProfilePicture,
            newBgPicture: this.newBgPicture,
        }
    
        dataService.updateUserProfile(data)
          .then(() => {
            this.success = 'Changes saved.';
            this.error = '';
          })
          .catch((error) => {
            this.error = error.response.data.message;
          });
        console.log('Changes saved:', data);
      },
    },
  };
  </script>
  