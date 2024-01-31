<template>   
      <div class="flex flex-col sticky top-0 h-max w-1/5">
        <div class="flex items-center justify-center mt-6">
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
            class="h-10 w-auto text-white"
            >
            <path d="M18 6 L12 12 L6 6"></path>
            <path d="M12 12 L12 18"></path>
            </svg>
        </div>
        <nav class="mt-10 px-2 space-y-1">
          <RouterLink
            to="/wall"
            :class="{ 'bg-gray-900 text-white': page === 'wall', 'text-gray-400 hover:text-white hover:bg-gray-700': page !== 'wall'}"
            class=" flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md "
          >
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
              class="mr-4 h-6 w-6  bg-transparent"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Wall
          </RouterLink>

          <RouterLink
            to="/notifications"
            :class="{ 'bg-gray-900 text-white': page === 'notifications', 'text-gray-400 hover:text-white hover:bg-gray-700': page !== 'notifications'}"
            class="w-full flex px-2 py-2 text-base leading-6 font-medium rounded-md "          >
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
          class="mr-4 h-6 w-6  -hover:text-gray-300  bg-transparent"
        >
          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
        </svg>
            Notifications
          <NotificationBubble class="ml-6 bg-transparent"/>
          </RouterLink>

          <RouterLink
            :to="{ name: 'profile', params: { userId: userId } }"
            :class="{ 'bg-gray-900 text-white': page === 'profile', 'text-gray-400 hover:text-white hover:bg-gray-700': page !== 'profile'}"
            class=" flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md "          >
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
              class="mr-4 h-6 w-6 text-gray-400 -hover:text-gray-300 bg-transparent"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Profile
          </RouterLink >
          <div>
          </div>
          <LogoutButton />
        </nav>
      </div>
      
</template>
  
  <script>
import LogoutButton from '@/components/LogoutButton.vue';
import NotificationBubble from '@/components/NotificationBubble.vue';

import { useAuthStore } from '@/stores/authStore';

  export default {
    props: {
      route : {
        type: Object,
        required: true,
      },
    },
    data() {
        return {
            page: this.route.name,
            userId: useAuthStore().user.userId ? useAuthStore().user.userId : "1", // TODO redirect to 404
        };
    },
    components: { LogoutButton, NotificationBubble }
}

  </script>
  