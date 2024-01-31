<template>
  <div class="fixed z-50 flex w-full justify-center bg-transparent">
    <Transition
      enter-from-class="translate-y-[-150%] opacity-0"
      leave-to-class="translate-y-[-150%] opacity-0"
      enter-active-class="transition duration-300"
      leave-active-class="transition duration-300"
    >
      <button
        class="mt-20 flex cursor-pointer select-none items-center gap-2 rounded-full bg-blue-500 px-3 py-2 text-white"
        v-if="count > 0"
        @click="scrollAndRefresh"
      >
        <svg class="w-6 h-6 text-white bg-transparent " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v13m0-13 4 4m-4-4-4 4"/>
        </svg>
        {{ count }} new posts
    </button>
    </Transition>
  </div>
</template>

<script>
    import { Transition } from "vue";
    import { useNotificationStore } from "@/stores/notificationStore";

    export default {
        components: {
            Transition,
        },
        data() {
            return {
                count: 0,
            }
        },
        mounted() {
            this.count = useNotificationStore().newPostsAvailable;
        },
        methods: {
            scrollAndRefresh() {
                window.scrollTo({ top: 0, behavior: "smooth" });
                useNotificationStore().clearNewPosts();
            }
        }
    }
</script>