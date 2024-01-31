<template>
    <div>
      <transition name="notification">
        <div v-if="count > 0" class="relative inline-block bg-inherit">
          <div class="w-2 h-2 rounded-full bg-blue-400 flex items-center justify-center text-white">
          </div>
        </div>
        <div v-else class="relative inline-block bg-inherit">
        </div>
      </transition> 
    </div>
  </template>
  
  <script>
  import { useNotificationStore } from '@/stores/notificationStore';
  
  export default {
    computed: {
      count() {
        return useNotificationStore().getNotificationsCount();
      }
    },
} 
  </script>
  