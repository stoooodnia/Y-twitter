<template>
  <div class="min-h-screen max-w-screen flex bg-black justify-center">
    <NavBarView :route="$route"/> 
      <div class="bg-gray-800 text-white w-min-screen w-full h-full">
          <div
            class=""
          >
            <div class="flex flex-col space-y-1.5 p-6">
              <h3
                class="text-3xl font-semibold whitespace-nowrap leading-none tracking-tight"
              >
                Notifications
              </h3>
            </div>
            <div class="p-6" v-if="notifications.length > 0">
              <Notification v-for="notification in notifications" :key="notification.id" :notification="notification" class="group flex flex-col gap-4 py-2 px-4 border-b border-gray-600"/>
            </div>
            <div class="p-6 text-gray-600" v-else>
              <h1>
                No notifications
              </h1>
            </div>
          </div>
      </div>
    <RightBarView />
  </div>
</template>
  
<script>
  import NavBarView from "@/views/NavBarView.vue";
  import RightBarView from "@/views/RightBarView.vue";
  import Notification from "@/components/Notification.vue";
  import { useNotificationStore } from "@/stores/notificationStore";
  
  export default {
    components: {
      NavBarView,
      RightBarView,
      Notification
    },
    data() {
      return {
        notifications: useNotificationStore().notifications,
      };
    },
    methods: {
    },
  };
</script>